// In-memory cache (persists across requests in same Vercel instance)
const cache = new Map();
const rateLimitMap = new Map();

const CACHE_TTL = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT = 30; // max requests per IP per day
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
    // Ask Claude; if the reply is cut off or isn't valid JSON, retry once with more room.
    let text = null;
    let lastProblem = "";
    for (let attempt = 0; attempt < 2; attempt++) {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-haiku-4-5-20251001",
          max_tokens: attempt === 0 ? maxTokens : Math.round(maxTokens * 1.6),
          messages: [{ role: "user", content: prompt }]
        })
      });

      const data = await response.json();

      if (!response.ok) {
        return res.status(response.status).json({ error: data.error?.message || "API error" });
      }

      let raw = (data.content || []).map(i => i.text || "").join("").replace(/```json|```/g, "").trim();

      // Keep only the JSON part, in case the model added text before or after it
      const first = raw.indexOf("{");
      const last = raw.lastIndexOf("}");
      if (first !== -1 && last > first) raw = raw.slice(first, last + 1);

      try {
        JSON.parse(raw);
        text = raw;
        break;
      } catch (e) {
        lastProblem = data.stop_reason === "max_tokens" ? "reply cut off" : "reply was not valid JSON";
        console.error("Claude reply problem (attempt " + (attempt + 1) + "):", lastProblem);
      }
    }

    if (!text) {
      return res.status(502).json({ error: "bad_reply", message: "Could not read the AI reply (" + lastProblem + "). Please try again." });
    }

    // Cache only replies that are valid JSON
    if (!skipCache) {
      cache.set(cacheKey, { text, timestamp: Date.now() });
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
