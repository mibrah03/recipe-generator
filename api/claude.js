// In-memory cache (persists across requests in same Vercel instance)
const cache = new Map();
const rateLimitMap = new Map();

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT = 10; // max requests per IP per day
const RATE_WINDOW = 24 * 60 * 60 * 1000; // 24 hours

function getCacheKey(prompt) {
  return prompt.trim().toLowerCase().slice(0, 200);
}

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  
  if (!entry || now - entry.windowStart > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, windowStart: now });
    return { allowed: true, remaining: RATE_LIMIT - 1 };
  }
  
  if (entry.count >= RATE_LIMIT) {
    const resetIn = Math.ceil((entry.windowStart + RATE_WINDOW - now) / 1000 / 60);
    return { allowed: false, remaining: 0, resetIn };
  }
  
  entry.count++;
  rateLimitMap.set(ip, entry);
  return { allowed: true, remaining: RATE_LIMIT - entry.count };
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") { res.status(200).end(); return; }
  if (req.method !== "POST") { res.status(405).json({ error: "Method not allowed" }); return; }

  const key = process.env.VITE_ANTHROPIC_API_KEY;
  if (!key) { res.status(500).json({ error: "API key not configured" }); return; }

  const { prompt, maxTokens = 1200, skipCache = false } = req.body;
  if (!prompt) { res.status(400).json({ error: "No prompt provided" }); return; }

  // Rate limiting by IP
  const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.socket?.remoteAddress || "unknown";
  const rateCheck = checkRateLimit(ip);
  
  res.setHeader("X-RateLimit-Remaining", rateCheck.remaining);
  
  if (!rateCheck.allowed) {
    return res.status(429).json({ 
      error: "rate_limit",
      message: `You've reached the daily limit. Resets in ${rateCheck.resetIn} minutes.`,
      resetIn: rateCheck.resetIn
    });
  }

  // Check cache (skip for pantry/personal prompts)
  const cacheKey = getCacheKey(prompt);
  if (!skipCache && cache.has(cacheKey)) {
    const cached = cache.get(cacheKey);
    if (Date.now() - cached.timestamp < CACHE_TTL) {
      res.setHeader("X-Cache", "HIT");
      return res.status(200).json({ text: cached.text, cached: true });
    }
    cache.delete(cacheKey);
  }

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: maxTokens,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "API error" });
    }

    const text = data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim();

    // Cache the response
    if (!skipCache) {
      cache.set(cacheKey, { text, timestamp: Date.now() });
      // Clean old cache entries if too large
      if (cache.size > 500) {
        const oldest = [...cache.entries()].sort((a,b) => a[1].timestamp - b[1].timestamp)[0];
        cache.delete(oldest[0]);
      }
    }

    res.setHeader("X-Cache", "MISS");
    return res.status(200).json({ text, cached: false });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
