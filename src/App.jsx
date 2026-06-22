import { useState, useRef, useEffect } from "react";

// ── DATA ─────────────────────────────────────────────────────────────────────
const ALL_CUISINES = [
  { label: "🇮🇹 Italian", value: "Italian" },{ label: "🇯🇵 Japanese", value: "Japanese" },
  { label: "🇲🇽 Mexican", value: "Mexican" },{ label: "🇮🇳 Indian", value: "Indian" },
  { label: "🇹🇭 Thai", value: "Thai" },{ label: "🇨🇳 Chinese", value: "Chinese" },
  { label: "🇫🇷 French", value: "French" },{ label: "🇬🇷 Greek", value: "Greek" },
  { label: "🇪🇸 Spanish", value: "Spanish" },{ label: "🇱🇧 Lebanese", value: "Lebanese" },
  { label: "🇰🇷 Korean", value: "Korean" },{ label: "🇲🇦 Moroccan", value: "Moroccan" },
  { label: "🇧🇷 Brazilian", value: "Brazilian" },{ label: "🇵🇪 Peruvian", value: "Peruvian" },
  { label: "🇳🇬 Nigerian", value: "Nigerian" },{ label: "🇲🇾 Malaysian", value: "Malaysian" },
  { label: "🇵🇭 Filipino", value: "Filipino" },{ label: "🇮🇩 Indonesian", value: "Indonesian" },
  { label: "🇸🇬 Singaporean", value: "Singaporean" },{ label: "🇻🇳 Vietnamese", value: "Vietnamese" },
  { label: "🇹🇷 Turkish", value: "Turkish" },{ label: "🇮🇷 Persian", value: "Persian" },
  { label: "🇵🇰 Pakistani", value: "Pakistani" },{ label: "🇸🇦 Saudi Arabian", value: "Saudi Arabian" },
  { label: "🇩🇪 German", value: "German" },{ label: "🇬🇧 British", value: "British" },
  { label: "🇵🇹 Portuguese", value: "Portuguese" },{ label: "🇷🇺 Russian", value: "Russian" },
  { label: "🇦🇷 Argentinian", value: "Argentinian" },{ label: "🇨🇴 Colombian", value: "Colombian" },
  { label: "🇺🇸 American", value: "American" },{ label: "🇯🇲 Jamaican", value: "Jamaican" },
  { label: "🇨🇺 Cuban", value: "Cuban" },{ label: "🇪🇹 Ethiopian", value: "Ethiopian" },
  { label: "🇬🇭 Ghanaian", value: "Ghanaian" },{ label: "🇰🇪 Kenyan", value: "Kenyan" },
  { label: "🇸🇴 Somali", value: "Somali" },{ label: "🇿🇦 South African", value: "South African" },
  { label: "🇦🇺 Australian", value: "Australian" },{ label: "🇹🇼 Taiwanese", value: "Taiwanese" },
  { label: "🇪🇬 Egyptian", value: "Egyptian" },{ label: "🇮🇱 Israeli", value: "Israeli" },
];

const QUICK_CHIPS = [
  { label: "🍕 Italian", value: "Italian" },{ label: "🍣 Japanese", value: "Japanese" },
  { label: "🌮 Mexican", value: "Mexican" },{ label: "🍛 Indian", value: "Indian" },
  { label: "🥩 American", value: "American" },{ label: "🫕 Greek", value: "Greek" },
  { label: "🍜 Thai", value: "Thai" },{ label: "🥘 Korean", value: "Korean" },
  { label: "🦞 Singaporean", value: "Singaporean" },{ label: "🥗 Lebanese", value: "Lebanese" },
  { label: "🍲 Malaysian", value: "Malaysian" },
];

const MEAL_STYLES = [
  { label: "🍽️ No Restriction", value: "" },{ label: "🥩 Non-Vegetarian", value: "non-vegetarian" },
  { label: "🌱 Vegetarian", value: "vegetarian" },{ label: "🥦 Vegan", value: "vegan" },
  { label: "🐟 Pescatarian", value: "pescatarian" },{ label: "🌾 Gluten-Free", value: "gluten-free" },
  { label: "🥛 Dairy-Free", value: "dairy-free" },{ label: "🥑 Keto", value: "keto" },
  { label: "💪 High Protein", value: "high protein" },
];

const MEAL_TYPES = [
  { label: "🎲 Surprise Me!", value: "any type of dish" },
  { label: "🍜 Noodles & Pasta", value: "noodles or pasta" },
  { label: "🥘 Stew & Curry", value: "stew or curry" },
  { label: "🥗 Salad", value: "salad" },{ label: "🍲 Soup", value: "soup" },
  { label: "🔥 Grilled", value: "grilled dish" },{ label: "🥩 Meat", value: "meat dish" },
  { label: "🐟 Seafood", value: "seafood dish" },{ label: "🥚 Breakfast", value: "breakfast" },
  { label: "🍰 Dessert", value: "dessert" },{ label: "🫓 Bread & Pastry", value: "bread or pastry" },
];

const LANGUAGES = [
  { label: "🇺🇸 English", value: "English" },{ label: "🇪🇸 Spanish", value: "Spanish" },
  { label: "🇫🇷 French", value: "French" },{ label: "🇦🇪 Arabic", value: "Arabic" },
  { label: "🇲🇾 Malay", value: "Malay" },{ label: "🇮🇩 Indonesian", value: "Indonesian" },
  { label: "🇩🇪 German", value: "German" },{ label: "🇧🇷 Portuguese", value: "Portuguese" },
  { label: "🇨🇳 Chinese", value: "Chinese (Simplified)" },{ label: "🇯🇵 Japanese", value: "Japanese" },
  { label: "🇰🇷 Korean", value: "Korean" },{ label: "🇮🇳 Hindi", value: "Hindi" },
];

const TAG_COLORS = ["#FF7A00","#FFC857","#a78bfa","#34d399","#60a5fa","#f472b6"];
const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
];

const PEXELS_KEY = ""; // Leave empty — we use free Pexels API

// ── STORAGE ───────────────────────────────────────────────────────────────────
const load = (k, d) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

// ── COMPONENTS ────────────────────────────────────────────────────────────────
function Dropdown({ icon, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const selected = options.find(o => o.value === value);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <button onClick={() => setOpen(!open)} style={{ width: "100%", padding: "13px 16px", borderRadius: 14, border: "1px solid " + (value ? "rgba(255,122,0,0.5)" : "rgba(255,255,255,0.08)"), background: value ? "rgba(255,122,0,0.08)" : "rgba(255,255,255,0.04)", color: value ? "#FF7A00" : "#666", fontSize: 14, cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "all 0.2s" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span>{icon}</span><span style={{ fontWeight: value ? 600 : 400 }}>{selected ? selected.label : placeholder}</span></span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.4 }}><path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 300, background: "#1A1A22", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.8)", maxHeight: 280, overflowY: "auto" }}>
          {options.map((o, i) => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }} style={{ width: "100%", padding: "12px 16px", background: value === o.value ? "rgba(255,122,0,0.12)" : "transparent", border: "none", borderBottom: i < options.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", color: value === o.value ? "#FF7A00" : "#ccc", fontSize: 13, cursor: "pointer", textAlign: "left", fontWeight: value === o.value ? 700 : 400 }}>{o.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

function CuisineSearch({ cuisine, setCuisine }) {
  const [input, setInput] = useState(cuisine || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) { setOpen(false); setFocused(false); } };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  useEffect(() => { setInput(cuisine || ""); }, [cuisine]);
  const handleInput = (val) => {
    setInput(val);
    if (!val.trim()) { setSuggestions([]); setOpen(false); setCuisine(""); return; }
    const f = ALL_CUISINES.filter(c => c.label.toLowerCase().includes(val.toLowerCase()) || c.value.toLowerCase().includes(val.toLowerCase())).slice(0, 7);
    setSuggestions(f); setOpen(true); setCuisine(val);
  };
  const select = (c) => { setInput(c.label); setCuisine(c.value); setSuggestions([]); setOpen(false); };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, border: "1px solid " + (focused ? "rgba(255,122,0,0.6)" : cuisine ? "rgba(255,122,0,0.4)" : "rgba(255,255,255,0.08)"), borderRadius: 14, background: "rgba(255,255,255,0.04)", transition: "all 0.2s", boxShadow: focused ? "0 0 0 3px rgba(255,122,0,0.1)" : "none", padding: "13px 16px" }}>
        <span>🌍</span>
        <input value={input} onChange={e => handleInput(e.target.value)} onFocus={() => { setFocused(true); if (suggestions.length > 0) setOpen(true); }} placeholder="Search country or cuisine…" style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: cuisine ? "#FF7A00" : "#fff", fontSize: 14, fontWeight: cuisine ? 600 : 400 }} />
        {input && <button onClick={() => { setInput(""); setCuisine(""); setSuggestions([]); setOpen(false); }} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#888", fontSize: 14, cursor: "pointer", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>}
      </div>
      {open && suggestions.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 300, background: "#1A1A22", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
          {suggestions.map((c, i) => (
            <button key={c.value} onClick={() => select(c)} style={{ width: "100%", padding: "11px 16px", background: "transparent", border: "none", borderBottom: i < suggestions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none", color: "#ddd", fontSize: 13, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 20 }}>{c.label.split(" ")[0]}</span><span>{c.label.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Timer({ seconds: init }) {
  const [seconds, setSeconds] = useState(init);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (running && seconds > 0) { ref.current = setInterval(() => setSeconds(s => { if (s <= 1) { clearInterval(ref.current); setRunning(false); setDone(true); return 0; } return s - 1; }), 1000); }
    return () => clearInterval(ref.current);
  }, [running]);
  const m = Math.floor(seconds / 60), s = seconds % 60;
  return (
    <button onClick={() => { if (done) { setSeconds(init); setDone(false); } else setRunning(!running); }} style={{ background: done ? "rgba(52,211,153,0.15)" : running ? "rgba(255,122,0,0.15)" : "rgba(255,255,255,0.06)", border: "1px solid " + (done ? "rgba(52,211,153,0.4)" : running ? "rgba(255,122,0,0.4)" : "rgba(255,255,255,0.1)"), borderRadius: 20, padding: "4px 10px", color: done ? "#34d399" : running ? "#FF7A00" : "#888", fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
      {done ? "✅ Done" : running ? `⏱ ${m}:${String(s).padStart(2,"0")} — tap to pause` : `▶ ${m}:${String(s).padStart(2,"0")}`}
    </button>
  );
}

function ShoppingList({ ingredients, onClose }) {
  const [checked, setChecked] = useState({});
  const toggle = (i) => setChecked(p => ({ ...p, [i]: !p[i] }));
  const copy = () => navigator.clipboard.writeText(ingredients.filter((_,i) => !checked[i]).map(i => "• " + i).join("\n"));
  const share = async () => {
    const text = "🛒 Shopping List\n\n" + ingredients.filter((_,i) => !checked[i]).map(i => "• " + i).join("\n");
    try {
      if (navigator.share) await navigator.share({ title: "Shopping List", text });
      else { await navigator.clipboard.writeText(text); alert("Copied to clipboard!"); }
    } catch(e) {}
  };
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", zIndex: 1000, display: "flex", alignItems: "flex-end", backdropFilter: "blur(4px)" }} onClick={onClose}>
      <div style={{ width: "100%", maxWidth: 600, margin: "0 auto", background: "#121218", borderRadius: "20px 20px 0 0", padding: "20px 20px 40px", maxHeight: "80vh", overflow: "hidden", display: "flex", flexDirection: "column" }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>🛒 Shopping List</h3>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={copy} style={{ background: "rgba(255,122,0,0.1)", border: "1px solid rgba(255,122,0,0.3)", borderRadius: 20, padding: "6px 14px", color: "#FF7A00", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📋 Copy</button>
            <button onClick={share} style={{ background: "rgba(96,165,250,0.1)", border: "1px solid rgba(96,165,250,0.3)", borderRadius: 20, padding: "6px 14px", color: "#60a5fa", fontSize: 12, fontWeight: 700, cursor: "pointer" }}>📤 Share</button>
            <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "none", borderRadius: 20, padding: "6px 14px", color: "#888", fontSize: 12, cursor: "pointer" }}>Close</button>
          </div>
        </div>
        <div style={{ overflowY: "auto", flex: 1 }}>
          {ingredients.map((ing, i) => (
            <div key={i} onClick={() => toggle(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)", cursor: "pointer" }}>
              <div style={{ width: 20, height: 20, borderRadius: 6, border: "2px solid " + (checked[i] ? "#FF7A00" : "rgba(255,255,255,0.2)"), background: checked[i] ? "#FF7A00" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                {checked[i] && <span style={{ color: "#fff", fontSize: 12 }}>✓</span>}
              </div>
              <span style={{ fontSize: 14, color: checked[i] ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.8)", textDecoration: checked[i] ? "line-through" : "none" }}>{ing}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Cooking Mode — full screen step by step
function CookingMode({ recipe, onClose }) {
  const [step, setStep] = useState(0);
  const total = recipe.steps.length;
  const pct = ((step + 1) / total) * 100;
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0B0B0F", zIndex: 2000, display: "flex", flexDirection: "column", fontFamily: "'Inter',system-ui,sans-serif" }}>
      {/* Header */}
      <div style={{ padding: "20px 20px 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: 11, color: "rgba(255,122,0,0.8)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 2 }}>Step {step + 1} of {total}</p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>{recipe.name}</p>
        </div>
        <button onClick={onClose} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "7px 14px", color: "#888", fontSize: 12, cursor: "pointer" }}>✕ Exit</button>
      </div>
      {/* Progress bar */}
      <div style={{ height: 3, background: "rgba(255,255,255,0.06)" }}>
        <div style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg,#FF7A00,#FFC857)", transition: "width 0.4s ease", borderRadius: 2 }} />
      </div>
      {/* Step content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 24px", textAlign: "center" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg,#FF7A00,#FFC857)", color: "#0B0B0F", fontWeight: 900, fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 32, boxShadow: "0 8px 32px rgba(255,122,0,0.4)" }}>{step + 1}</div>
        <p style={{ fontSize: 22, fontWeight: 700, color: "#fff", lineHeight: 1.6, maxWidth: 480, marginBottom: 32 }}>{recipe.steps[step]}</p>
        {recipe.stepTimes?.[step] > 0 && (
          <div style={{ marginBottom: 24 }}>
            <Timer seconds={recipe.stepTimes[step]} />
          </div>
        )}
      </div>
      {/* Nav */}
      <div style={{ padding: "20px 24px 40px", display: "flex", gap: 12 }}>
        <button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0} style={{ flex: 1, padding: "15px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", color: step === 0 ? "#333" : "#fff", fontSize: 14, fontWeight: 700, cursor: step === 0 ? "not-allowed" : "pointer" }}>← Previous</button>
        {step < total - 1
          ? <button onClick={() => setStep(step + 1)} style={{ flex: 2, padding: "15px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#FF7A00,#FFC857)", color: "#0B0B0F", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>Next Step →</button>
          : <button onClick={onClose} style={{ flex: 2, padding: "15px", borderRadius: 14, border: "none", background: "linear-gradient(135deg,#34d399,#059669)", color: "#fff", fontSize: 14, fontWeight: 800, cursor: "pointer" }}>🎉 Finished!</button>
        }
      </div>
    </div>
  );
}


// ── DISH DETAIL MODAL ────────────────────────────────────────────────────────
function DishDetail({ dish, image, restaurantName, cuisine, onClose }) {
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch_ = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
          body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 600, messages: [{ role: "user", content: `Tell me about the ${cuisine} dish called "${dish}" from a ${restaurantName}. Respond ONLY with JSON: {"description":"2 sentence description of this dish","taste":"Flavor profile in one sentence","ingredients":["main ingredient 1","main ingredient 2","main ingredient 3","main ingredient 4"],"allergens":["gluten","dairy etc if any"],"spiceLevel":"Mild / Medium / Hot / Very Hot","calories":"approximate calories per serving"}` }] })
        });
        const data = await res.json();
        const parsed = JSON.parse(data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim());
        setInfo(parsed);
      } catch(e) {}
      setLoading(false);
    };
    fetch_();
  }, [dish]);

  const spiceColors = { "Mild": "#34d399", "Medium": "#FFC857", "Hot": "#FF7A00", "Very Hot": "#ef4444" };

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.9)", zIndex:2000, display:"flex", alignItems:"flex-end", backdropFilter:"blur(8px)", fontFamily:"'Inter',system-ui,sans-serif" }} onClick={onClose}>
      <div style={{ width:"100%", maxWidth:600, margin:"0 auto", background:"#121218", borderRadius:"24px 24px 0 0", overflow:"hidden", maxHeight:"90vh", display:"flex", flexDirection:"column" }} onClick={e => e.stopPropagation()}>
        {/* Image */}
        <div style={{ position:"relative", height:220, background:"#1A1A22", flexShrink:0 }}>
          {image ? <img src={image} alt={dish} style={{ width:"100%", height:"100%", objectFit:"cover" }} /> : <div style={{ width:"100%", height:"100%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:64 }}>🍽️</div>}
          <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 40%,#121218 100%)" }} />
          <button onClick={onClose} style={{ position:"absolute", top:14, right:14, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"50%", width:34, height:34, color:"#fff", fontSize:16, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        {/* Content */}
        <div style={{ padding:"20px 20px 36px", overflowY:"auto" }}>
          <h2 style={{ fontSize:22, fontWeight:800, color:"#fff", marginBottom:4 }}>{dish}</h2>
          <p style={{ fontSize:12, color:"rgba(255,122,0,0.7)", fontWeight:600, marginBottom:16 }}>{restaurantName} · {cuisine}</p>

          {loading ? (
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {[120,80,100].map((w,i) => <div key={i} style={{ height:14, borderRadius:7, background:"linear-gradient(90deg,#1A1A22 25%,#242430 50%,#1A1A22 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite", width:w+"%" }} />)}
            </div>
          ) : info ? (
            <>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginBottom:16 }}>{info.description}</p>

              {/* Meta row */}
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {info.calories && <div style={{ background:"rgba(255,122,0,0.08)", border:"1px solid rgba(255,122,0,0.2)", borderRadius:20, padding:"5px 12px", fontSize:12, color:"#FFC857", fontWeight:600 }}>🔥 ~{info.calories}</div>}
                {info.spiceLevel && <div style={{ background:`${spiceColors[info.spiceLevel] || "#FF7A00"}18`, border:`1px solid ${spiceColors[info.spiceLevel] || "#FF7A00"}40`, borderRadius:20, padding:"5px 12px", fontSize:12, color:spiceColors[info.spiceLevel] || "#FF7A00", fontWeight:600 }}>🌶 {info.spiceLevel}</div>}
              </div>

              {/* Taste */}
              {info.taste && (
                <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"12px 14px", marginBottom:14 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,122,0,0.8)", textTransform:"uppercase", letterSpacing:1.2, marginBottom:6 }}>Taste Profile</p>
                  <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", lineHeight:1.6 }}>{info.taste}</p>
                </div>
              )}

              {/* Key ingredients */}
              {info.ingredients?.length > 0 && (
                <div style={{ marginBottom:14 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,122,0,0.8)", textTransform:"uppercase", letterSpacing:1.2, marginBottom:8 }}>Key Ingredients</p>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                    {info.ingredients.map((ing,i) => <span key={i} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:"4px 12px", fontSize:12, color:"rgba(255,255,255,0.55)" }}>{ing}</span>)}
                  </div>
                </div>
              )}

              {/* Allergens */}
              {info.allergens?.length > 0 && (
                <div style={{ background:"rgba(255,80,80,0.06)", border:"1px solid rgba(255,80,80,0.15)", borderRadius:12, padding:"10px 14px" }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,80,80,0.7)", textTransform:"uppercase", letterSpacing:1.2, marginBottom:6 }}>⚠️ Allergens</p>
                  <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{info.allergens.join(", ")}</p>
                </div>
              )}
            </>
          ) : <p style={{ color:"rgba(255,255,255,0.3)", fontSize:13 }}>Could not load dish info.</p>}

          {/* Order links */}
          <div style={{ marginTop:20, display:"flex", gap:8 }}>
            <a href={`https://www.ubereats.com/search?q=${encodeURIComponent(dish)}`} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(6,181,93,0.1)", border:"1px solid rgba(6,181,93,0.3)", borderRadius:12, padding:"11px 6px", color:"#06B55D", fontSize:12, fontWeight:700 }}>🟢 Uber Eats</a>
            <a href={`https://www.doordash.com/search/store/${encodeURIComponent(dish)}/`} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,60,60,0.1)", border:"1px solid rgba(255,60,60,0.3)", borderRadius:12, padding:"11px 6px", color:"#FF3C3C", fontSize:12, fontWeight:700 }}>🔴 DoorDash</a>
            <a href={`https://www.grubhub.com/search?queryText=${encodeURIComponent(dish)}`} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(255,153,0,0.1)", border:"1px solid rgba(255,153,0,0.3)", borderRadius:12, padding:"11px 6px", color:"#FF9900", fontSize:12, fontWeight:700 }}>🟡 GrubHub</a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── DISH MENU ─────────────────────────────────────────────────────────────────
function DishMenu({ dishes, restaurantName, dishImages, cuisine }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);
  const visible = expanded ? dishes : dishes.slice(0, 4);

  return (
    <div style={{ padding:"14px 18px" }}>
      {selectedDish && (
        <DishDetail
          dish={selectedDish}
          image={dishImages[selectedDish]}
          restaurantName={restaurantName}
          cuisine={cuisine}
          onClose={() => setSelectedDish(null)}
        />
      )}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,122,0,0.8)", textTransform:"uppercase", letterSpacing:1.5 }}>🍴 Signature Dishes</p>
        <span style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>Tap to view details</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {visible.map((dish,j) => (
          <div key={j} onClick={() => setSelectedDish(dish)} style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.03)", borderRadius:12, border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden", cursor:"pointer", transition:"all 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.border="1px solid rgba(255,122,0,0.3)"}
            onMouseLeave={e => e.currentTarget.style.border="1px solid rgba(255,255,255,0.06)"}>
            <div style={{ width:72, height:72, flexShrink:0, background:"#1A1A22", overflow:"hidden", position:"relative" }}>
              {dishImages[dish]
                ? <img src={dishImages[dish]} alt={dish} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={e => e.currentTarget.style.display="none"} />
                : <div style={{ width:"100%", height:"100%", background:"linear-gradient(90deg,#1A1A22 25%,#242430 50%,#1A1A22 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />}
            </div>
            <div style={{ flex:1, padding:"0 4px 0 0" }}>
              <p style={{ fontSize:13, fontWeight:600, color:"#fff", marginBottom:2 }}>{dish}</p>
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.25)" }}>{restaurantName}</p>
            </div>
            <span style={{ color:"rgba(255,122,0,0.5)", fontSize:16, paddingRight:14 }}>›</span>
          </div>
        ))}
      </div>
      {dishes.length > 4 && (
        <button onClick={() => setExpanded(!expanded)} style={{ width:"100%", marginTop:10, padding:"10px", borderRadius:10, border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.03)", color:"rgba(255,255,255,0.4)", fontSize:12, fontWeight:600, cursor:"pointer" }}>
          {expanded ? "Show Less ↑" : `Show All ${dishes.length} Dishes ↓`}
        </button>
      )}
    </div>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [tab, setTab] = useState("cook");
  const [mode, setMode] = useState("random");
  const [cuisine, setCuisine] = useState("");
  const [mealStyle, setMealStyle] = useState(() => load("pref_style", ""));
  const [mealType, setMealType] = useState("");
  const [language, setLanguage] = useState("English");
  const [pantryInput, setPantryInput] = useState("");
  const [pantryItems, setPantryItems] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [nutrition, setNutrition] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);
  const [dishImages, setDishImages] = useState({});
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareMsg, setShareMsg] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [servings, setServings] = useState(4);
  const [showShopping, setShowShopping] = useState(false);
  const [showCooking, setShowCooking] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [btnHover, setBtnHover] = useState(false);
  const [heroImg] = useState(() => HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
  const todayCuisine = ALL_CUISINES[new Date().getDate() % ALL_CUISINES.length];

  const addPantryItem = (e) => { if (e.key === "Enter" || e.key === ",") { e.preventDefault(); const val = pantryInput.trim().replace(/,$/, ""); if (val && !pantryItems.includes(val)) setPantryItems([...pantryItems, val]); setPantryInput(""); } };
  const addPantryItemOnBlur = () => { const val = pantryInput.trim().replace(/,$/, ""); if (val && !pantryItems.includes(val)) setPantryItems([...pantryItems, val]); setPantryInput(""); };
  const removeItem = (item) => setPantryItems(pantryItems.filter(i => i !== item));

  // ── IMAGE: Pexels (accurate food photos) ─────────────────────────────────
  const fetchImage = async (recipeName) => {
    setImageLoading(true); setRecipeImage(null);
    try {
      // Try Pexels first — much more accurate food photos
      const pexelsRes = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(recipeName + " food dish")}&per_page=1&orientation=landscape`, {
        headers: { Authorization: "YOUR_PEXELS_KEY" }
      });
      if (pexelsRes.ok) {
        const pexelsData = await pexelsRes.json();
        if (pexelsData.photos?.[0]) { setRecipeImage(pexelsData.photos[0].src.large); setImageLoading(false); return; }
      }
    } catch(e) {}
    // Fallback: Wikipedia thumbnail API
    try {
      const res = await fetch("https://en.wikipedia.org/w/api.php?action=query&titles=" + encodeURIComponent(recipeName) + "&prop=pageimages&pithumbsize=800&format=json&origin=*");
      const pages = (await res.json()).query?.pages;
      if (pages) { const p = Object.values(pages)[0]; if (p?.thumbnail?.source) { setRecipeImage(p.thumbnail.source); setImageLoading(false); return; } }
      // Deep fallback
      const res2 = await fetch("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + encodeURIComponent(recipeName) + "&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|mime&format=json&origin=*");
      const pages2 = (await res2.json()).query?.pages;
      if (pages2) { for (const page of Object.values(pages2)) { const info = page.imageinfo?.[0]; if (info?.mime?.startsWith("image/") && /\.(jpg|jpeg|png|webp)/i.test(info.url) && !info.url.includes("Flag") && !info.url.includes("Map") && !info.url.includes("Logo") && !info.url.includes("icon")) { setRecipeImage(info.url); setImageLoading(false); return; } } }
    } catch(e) {}
    setImageLoading(false);
  };

  const fetchDishImage = async (dish) => {
    try {
      const res = await fetch("https://en.wikipedia.org/w/api.php?action=query&titles=" + encodeURIComponent(dish) + "&prop=pageimages&pithumbsize=400&format=json&origin=*");
      const pages = (await res.json()).query?.pages;
      if (pages) { const p = Object.values(pages)[0]; if (p?.thumbnail?.source) return p.thumbnail.source; }
      const res2 = await fetch("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + encodeURIComponent(dish + " food") + "&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&format=json&origin=*");
      const pages2 = (await res2.json()).query?.pages;
      if (pages2) { for (const p of Object.values(pages2)) { const info = p.imageinfo?.[0]; if (info?.mime?.startsWith("image/") && /\.(jpg|jpeg|png|webp)/i.test(info.url) && !info.url.includes("Flag")) return info.url; } }
    } catch(e) {}
    return null;
  };

  const getLocation = () => new Promise((res, rej) => { if (!navigator.geolocation) rej(); else navigator.geolocation.getCurrentPosition(res, rej); });

  const callClaude = async (prompt, maxTokens = 1200) => {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
      body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] })
    });
    const data = await res.json();
    return data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim();
  };

  const generateRecipe = async (overridePrompt) => {
    if (!cuisine) { setError("Search for a cuisine first"); return; }
    if (mode === "random" && !mealType) { setError("Pick a meal type"); return; }
    if (mode === "pantry" && pantryItems.length === 0) { setError("Add at least one ingredient"); return; }
    setError(""); setLoading(true); setRecipe(null); setRecipeImage(null); setNutrition(null); setFeedback(null);
    const styleText = mealStyle ? ` The recipe must be ${mealStyle}.` : "";
    const langText = language !== "English" ? ` Translate the entire recipe including name, description, ingredients and steps into ${language}.` : "";
    const prompt = overridePrompt || (mode === "random"
      ? `Generate a random authentic ${cuisine} ${mealType} recipe.${styleText}${langText}`
      : `Generate an authentic ${cuisine} recipe using ONLY or mostly these ingredients: ${pantryItems.join(", ")}. Assume basic staples available.${styleText}${langText}`);
    try {
      const text = await callClaude(`${prompt} Respond ONLY with JSON: {"name":"Recipe Name","description":"One sentence","time":30,"difficulty":"Easy","servings":4,"ingredients":["item with qty"],"steps":["Step 1"],"stepTimes":[0,300,0],"tip":"Chef tip","calories":450,"protein":28,"carbs":35,"fat":18}`);
      const parsed = JSON.parse(text);
      setRecipe(parsed);
      setServings(parsed.servings || 4);
      if (parsed.calories) setNutrition({ calories: parsed.calories, protein: parsed.protein, carbs: parsed.carbs, fat: parsed.fat });
      fetchImage(parsed.name);
      // Add to history
      const newHistory = [{ ...parsed, cuisine, timestamp: Date.now() }, ...history].slice(0, 10);
      setHistory(newHistory);
    } catch(err) { setError("Something went wrong. Try again!"); }
    setLoading(false);
  };

  const regenerate = (thumbs) => {
    setFeedback(thumbs);
    if (thumbs === "down" && recipe) generateRecipe(`Generate a DIFFERENT authentic ${cuisine} ${mealType || "dish"} recipe. NOT ${recipe.name}. Make it distinct.${mealStyle ? ` Must be ${mealStyle}.` : ""}`);
  };

  const findRestaurants = async () => {
    if (!cuisine) { setError("Search for a cuisine first"); return; }
    setError(""); setLoading(true); setRestaurants(null); setDishImages({});
    try {
      let locationText = "The user's location is unknown, suggest they search nearby.";
      try { const pos = await getLocation(); locationText = `User is at lat ${pos.coords.latitude}, lng ${pos.coords.longitude}.`; } catch(e) {}
      const styleText = mealStyle ? ` User prefers ${mealStyle}.` : "";
      const text = await callClaude(`${locationText}${styleText} User wants ${cuisine} food. Suggest 3 real-world types of ${cuisine} restaurants with 4 signature must-order dishes each. Note: these are real restaurant types that exist. Respond ONLY with JSON: {"restaurants":[{"name":"Restaurant type","vibe":"Short atmosphere description","mustOrder":["Dish 1","Dish 2","Dish 3","Dish 4"],"priceRange":"$$","searchTip":"Exact Google Maps search term","disclaimer":"These are suggested restaurant types, not confirmed locations"}]}`);
      const parsed = JSON.parse(text);
      setRestaurants(parsed.restaurants);
      const imgs = {};
      for (const r of parsed.restaurants) { const dishes = r.menu || r.mustOrder || []; for (const dish of dishes) { if (!imgs[dish]) { const img = await fetchDishImage(dish); if (img) imgs[dish] = img; } } }
      setDishImages(imgs);
    } catch(err) { setError("Something went wrong. Try again!"); }
    setLoading(false);
  };

  const shareRecipe = async () => {
    if (!recipe) return;
    const text = `🍽️ ${recipe.name}\n\n${recipe.description}\n\n⏱️ ${recipe.time} min | Serves ${servings}\n\n🛒 Ingredients:\n${recipe.ingredients.map(i => "• " + scaleIng(i)).join("\n")}\n\nGenerated by What Should I Cook?`;
    try { if (navigator.share) await navigator.share({ title: recipe.name, text }); else { await navigator.clipboard.writeText(text); setShareMsg("Copied!"); setTimeout(() => setShareMsg(""), 2500); } } catch(e) {}
  };

  const printRecipe = () => {
    if (!recipe) return;
    const win = window.open("", "_blank");
    win.document.write(`<html><head><title>${recipe.name}</title><style>body{font-family:Georgia,serif;max-width:600px;margin:40px auto;color:#222;line-height:1.6}h1{font-size:28px;margin-bottom:8px}p{color:#555}h2{font-size:16px;text-transform:uppercase;letter-spacing:1px;color:#FF7A00;margin-top:24px}ul,ol{padding-left:20px}li{margin-bottom:6px}.meta{display:flex;gap:20px;margin:16px 0;font-size:14px;color:#888}.tip{background:#fff8f0;border-left:3px solid #FF7A00;padding:10px 14px;margin-top:20px;font-style:italic}</style></head><body>
      <h1>${recipe.name}</h1><p>${recipe.description}</p>
      <div class="meta"><span>⏱ ${recipe.time} min</span><span>📊 ${recipe.difficulty}</span><span>👥 Serves ${servings}</span>${nutrition ? `<span>🔥 ${nutrition.calories} cal</span>` : ""}</div>
      <h2>Ingredients</h2><ul>${recipe.ingredients.map(i => `<li>${scaleIng(i)}</li>`).join("")}</ul>
      <h2>Instructions</h2><ol>${recipe.steps.map(s => `<li>${s}</li>`).join("")}</ol>
      ${recipe.tip ? `<div class="tip">👨‍🍳 ${recipe.tip}</div>` : ""}
      </body></html>`);
    win.document.close(); win.print();
  };

  const scaleIng = (ing) => {
    if (!recipe) return ing;
    const ratio = servings / (recipe.servings || 4);
    if (ratio === 1) return ing;
    return ing.replace(/(\d+(\.\d+)?)/g, m => { const s = parseFloat(m) * ratio; return s % 1 === 0 ? s : s.toFixed(1); });
  };

  const reset = () => { setRecipe(null); setRestaurants(null); setRecipeImage(null); setDishImages({}); setNutrition(null); setError(""); setFeedback(null); };

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    @keyframes spin { to { transform: rotate(360deg); } }
    @keyframes fadeUp { from { opacity:0;transform:translateY(20px); } to { opacity:1;transform:translateY(0); } }
    @keyframes shimmer { from { background-position:-200% 0; } to { background-position:200% 0; } }
    @keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.4} }
    * { box-sizing:border-box;margin:0;padding:0; }
    ::-webkit-scrollbar{width:0;height:0;}
    input::placeholder{color:#444;}
    a{text-decoration:none;}
  `;

  return (
    <div style={{ minHeight:"100vh", background:"#0B0B0F", fontFamily:"'Inter','SF Pro Display',-apple-system,system-ui,sans-serif", color:"#fff", overflowX:"hidden" }}>
      <style>{css}</style>

      {showCooking && recipe && <CookingMode recipe={recipe} onClose={() => setShowCooking(false)} />}
      {showShopping && recipe && <ShoppingList ingredients={recipe.ingredients.map(i => scaleIng(i))} onClose={() => setShowShopping(false)} />}

      {/* HERO */}
      <div style={{ position:"relative", height:380, overflow:"hidden" }}>
        <img src={heroImg} alt="Food" style={{ width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.3)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,rgba(11,11,15,0.1) 0%,rgba(11,11,15,0.65) 60%,#0B0B0F 100%)" }} />
        <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", justifyContent:"flex-end", padding:"0 20px 28px" }}>
          <div style={{ animation:"fadeUp 0.6s ease" }}>
            <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"rgba(255,122,0,0.15)", border:"1px solid rgba(255,122,0,0.3)", borderRadius:20, padding:"4px 12px", marginBottom:10, cursor:"pointer" }} onClick={() => { setCuisine(todayCuisine.value); reset(); }}>
              <span style={{ width:6, height:6, borderRadius:"50%", background:"#FF7A00", animation:"pulse 2s infinite", display:"inline-block" }} />
              <span style={{ fontSize:11, fontWeight:600, color:"#FF7A00", letterSpacing:1, textTransform:"uppercase" }}>Today's Pick · {todayCuisine.label}</span>
            </div>
            <h1 style={{ fontSize:30, fontWeight:900, lineHeight:1.15, marginBottom:8, letterSpacing:"-0.5px" }}>What Should I<br /><span style={{ background:"linear-gradient(90deg,#FF7A00,#FFC857)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Cook Tonight?</span></h1>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", lineHeight:1.5 }}>AI-powered recipes tailored to your cravings.</p>
          </div>
        </div>
      </div>

      <div style={{ padding:"0 16px 80px", maxWidth:600, margin:"0 auto" }}>

        {/* Cook / Eat Out */}
        <div style={{ marginTop:-16, marginBottom:20, animation:"fadeUp 0.5s ease 0.1s both" }}>
          <div style={{ display:"flex", background:"rgba(255,255,255,0.04)", borderRadius:18, padding:4, border:"1px solid rgba(255,255,255,0.06)", position:"relative" }}>
            <div style={{ position:"absolute", top:4, bottom:4, left:tab==="cook"?4:"calc(50% + 2px)", width:"calc(50% - 6px)", background:"linear-gradient(135deg,#FF7A00,#FFC857)", borderRadius:14, transition:"left 0.35s cubic-bezier(0.4,0,0.2,1)", boxShadow:"0 4px 20px rgba(255,122,0,0.4)" }} />
            {[["cook","👨‍🍳 Cook"],["eat","🍴 Eat Out"]].map(([val,lbl]) => (
              <button key={val} onClick={() => { setTab(val); reset(); }} style={{ flex:1, padding:"13px 0", border:"none", background:"transparent", color:tab===val?"#0B0B0F":"rgba(255,255,255,0.4)", fontSize:14, fontWeight:tab===val?800:500, cursor:"pointer", position:"relative", zIndex:1, borderRadius:14, transition:"color 0.3s" }}>{lbl}</button>
            ))}
          </div>
        </div>

        {/* Quick Chips */}
        <div style={{ marginBottom:18 }}>
          <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:1.5, marginBottom:8 }}>Quick Pick</p>
          <div style={{ display:"flex", gap:7, overflowX:"auto", paddingBottom:2 }}>
            {QUICK_CHIPS.map(c => {
              const active = cuisine === c.value;
              return <button key={c.value} onClick={() => { setCuisine(c.value); reset(); }} style={{ flexShrink:0, padding:"7px 13px", borderRadius:20, border:"1px solid "+(active?"rgba(255,122,0,0.8)":"rgba(255,255,255,0.07)"), background:active?"rgba(255,122,0,0.15)":"rgba(255,255,255,0.03)", color:active?"#FF7A00":"rgba(255,255,255,0.5)", fontSize:12, fontWeight:active?700:400, cursor:"pointer", boxShadow:active?"0 0 16px rgba(255,122,0,0.2)":"none", transition:"all 0.2s", whiteSpace:"nowrap" }}>{c.label}</button>;
            })}
          </div>
        </div>

        {/* Cook sub modes */}
        {tab === "cook" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:18 }}>
            {[{val:"random",icon:"🎲",title:"Surprise Me",desc:"Get a random recipe"},{val:"pantry",icon:"🧺",title:"My Ingredients",desc:"Cook what you have"}].map(item => (
              <button key={item.val} onClick={() => { setMode(item.val); reset(); }} style={{ padding:"16px", borderRadius:16, border:"1px solid "+(mode===item.val?"rgba(255,122,0,0.5)":"rgba(255,255,255,0.06)"), background:mode===item.val?"rgba(255,122,0,0.1)":"rgba(255,255,255,0.02)", cursor:"pointer", textAlign:"left", transition:"all 0.2s", boxShadow:mode===item.val?"0 0 24px rgba(255,122,0,0.15)":"none" }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{item.icon}</div>
                <div style={{ fontSize:13, fontWeight:700, color:mode===item.val?"#FF7A00":"#fff", marginBottom:2 }}>{item.title}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{item.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* Inputs */}
        <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
          <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:1.5 }}>Customize</p>
          <CuisineSearch cuisine={cuisine} setCuisine={(v) => { setCuisine(v); reset(); }} />
          <Dropdown icon="🥗" value={mealStyle} onChange={setMealStyle} options={MEAL_STYLES} placeholder="Any dietary style…" />
          {tab === "cook" && mode === "random" && <Dropdown icon="🍽️" value={mealType} onChange={setMealType} options={MEAL_TYPES} placeholder="What type of dish?…" />}
          <Dropdown icon="🌐" value={language} onChange={setLanguage} options={LANGUAGES} placeholder="Language…" />
          {tab === "cook" && mode === "pantry" && (
            <div style={{ padding:"14px 16px", borderRadius:14, border:"1px solid rgba(255,255,255,0.08)", background:"rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:1.5, marginBottom:10 }}>🧺 Your Ingredients</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7, marginBottom:pantryItems.length>0?10:0 }}>
                {pantryItems.map((item,i) => <span key={item} style={{ background:`${TAG_COLORS[i%TAG_COLORS.length]}18`, border:`1px solid ${TAG_COLORS[i%TAG_COLORS.length]}40`, color:TAG_COLORS[i%TAG_COLORS.length], borderRadius:20, padding:"4px 12px", fontSize:12, fontWeight:600, display:"flex", alignItems:"center", gap:5 }}>{item}<span onClick={() => removeItem(item)} style={{ cursor:"pointer", opacity:0.6, fontSize:14 }}>×</span></span>)}
              </div>
              <input value={pantryInput} onChange={e => setPantryInput(e.target.value)} onKeyDown={addPantryItem} onBlur={addPantryItemOnBlur} placeholder="Add ingredients, press Enter…" style={{ width:"100%", background:"transparent", border:"none", outline:"none", color:"#fff", fontSize:14 }} />
            </div>
          )}
        </div>

        {error && <div style={{ background:"rgba(255,80,80,0.08)", border:"1px solid rgba(255,80,80,0.25)", borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:13, color:"#ff6b6b" }}>⚠️ {error}</div>}

        {/* History button */}
        {history.length > 0 && !recipe && (
          <button onClick={() => setShowHistory(!showHistory)} style={{ width:"100%", padding:"11px", borderRadius:12, border:"1px solid rgba(255,255,255,0.07)", background:"rgba(255,255,255,0.03)", color:"rgba(255,255,255,0.35)", fontSize:12, cursor:"pointer", marginBottom:12 }}>
            🕐 Recent Recipes ({history.length})
          </button>
        )}
        {showHistory && (
          <div style={{ background:"#121218", borderRadius:14, border:"1px solid rgba(255,255,255,0.06)", overflow:"hidden", marginBottom:14 }}>
            {history.map((h, i) => (
              <div key={i} onClick={() => { setRecipe(h); setServings(h.servings||4); setShowHistory(false); if(h.calories) setNutrition({calories:h.calories,protein:h.protein,carbs:h.carbs,fat:h.fat}); }} style={{ padding:"12px 16px", borderBottom:i<history.length-1?"1px solid rgba(255,255,255,0.04)":"none", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:"#fff", marginBottom:2 }}>{h.name}</p>
                  <p style={{ fontSize:11, color:"rgba(255,255,255,0.3)" }}>{h.cuisine} · {h.time} min</p>
                </div>
                <span style={{ color:"rgba(255,255,255,0.2)", fontSize:16 }}>→</span>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <button onClick={tab==="cook" ? () => generateRecipe() : findRestaurants} disabled={loading} onMouseEnter={() => setBtnHover(true)} onMouseLeave={() => setBtnHover(false)} style={{ width:"100%", padding:"17px", borderRadius:16, border:"none", background:loading?"#1A1A22":"linear-gradient(135deg,#FF7A00 0%,#FFC857 100%)", color:loading?"#444":"#0B0B0F", fontSize:15, fontWeight:800, cursor:loading?"not-allowed":"pointer", boxShadow:loading?"none":btnHover?"0 8px 40px rgba(255,122,0,0.6)":"0 4px 24px rgba(255,122,0,0.35)", transition:"all 0.25s", transform:btnHover&&!loading?"translateY(-1px)":"none", marginBottom:28 }}>
          {loading ? <span style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}><span style={{ width:16, height:16, borderRadius:"50%", border:"2px solid #333", borderTopColor:"#666", animation:"spin 0.8s linear infinite", display:"inline-block" }} />Finding the perfect option…</span>
            : tab==="eat" ? "🍴 Find Restaurants Near Me" : mode==="pantry" ? "🧺 Cook With What I Have" : "✨ Generate My Recipe"}
        </button>

        {/* ── RECIPE CARD ── */}
        {recipe && (
          <div style={{ animation:"fadeUp 0.5s ease", borderRadius:20, overflow:"hidden", border:"1px solid rgba(255,255,255,0.08)", background:"#121218", boxShadow:"0 24px 80px rgba(0,0,0,0.6)", marginBottom:16 }}>
            {/* Image */}
            <div style={{ position:"relative", height:260, background:"#1A1A22" }}>
              {imageLoading && <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,#1A1A22 25%,#242430 50%,#1A1A22 75%)", backgroundSize:"200% 100%", animation:"shimmer 1.5s infinite" }} />}
              {recipeImage && <img src={recipeImage} alt={recipe.name} style={{ width:"100%", height:"100%", objectFit:"cover" }} onError={() => setRecipeImage(null)} />}
              {!imageLoading && !recipeImage && <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:64 }}>🍽️</div>}
              <div style={{ position:"absolute", inset:0, background:"linear-gradient(180deg,transparent 40%,#121218 100%)" }} />
              <div style={{ position:"absolute", top:14, right:14, display:"flex", gap:8 }}>
                <button onClick={shareRecipe} style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:"0 12px", height:36, color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer" }}>{shareMsg||"📤 Share"}</button>
                <button onClick={printRecipe} style={{ background:"rgba(0,0,0,0.6)", backdropFilter:"blur(10px)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:20, padding:"0 12px", height:36, color:"#fff", fontSize:12, fontWeight:600, cursor:"pointer" }}>🖨️ Print</button>
              </div>
            </div>

            <div style={{ padding:"20px 20px 24px" }}>
              <h2 style={{ fontSize:22, fontWeight:800, marginBottom:6, letterSpacing:"-0.3px" }}>{recipe.name}</h2>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.45)", marginBottom:16, lineHeight:1.6 }}>{recipe.description}</p>

              {/* Stats */}
              <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
                {[{icon:"⏱",label:`${recipe.time} min`},{icon:"📊",label:recipe.difficulty},{icon:"👥",label:`${servings} servings`}].map((s,i) => <div key={i} style={{ background:"rgba(255,122,0,0.08)", border:"1px solid rgba(255,122,0,0.2)", borderRadius:20, padding:"5px 12px", fontSize:12, color:"#FFC857", fontWeight:600, display:"flex", alignItems:"center", gap:5 }}>{s.icon} {s.label}</div>)}
              </div>

              {/* Nutrition */}
              {nutrition && (
                <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:8, marginBottom:16 }}>
                  {[{label:"Calories",val:Math.round(nutrition.calories*(servings/(recipe.servings||4))),unit:""},{label:"Protein",val:Math.round(nutrition.protein*(servings/(recipe.servings||4))),unit:"g"},{label:"Carbs",val:Math.round(nutrition.carbs*(servings/(recipe.servings||4))),unit:"g"},{label:"Fat",val:Math.round(nutrition.fat*(servings/(recipe.servings||4))),unit:"g"}].map((n,i) => (
                    <div key={i} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:12, padding:"10px 8px", textAlign:"center" }}>
                      <p style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{n.val}{n.unit}</p>
                      <p style={{ fontSize:10, color:"rgba(255,255,255,0.3)", marginTop:2 }}>{n.label}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Serving adjuster */}
              <div style={{ display:"flex", alignItems:"center", gap:12, background:"rgba(255,255,255,0.03)", borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)", flex:1 }}>Adjust servings</span>
                <button onClick={() => setServings(Math.max(1,servings-1))} style={{ width:28, height:28, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"#fff", fontSize:16, cursor:"pointer" }}>−</button>
                <span style={{ fontSize:15, fontWeight:700, color:"#FF7A00", minWidth:24, textAlign:"center" }}>{servings}</span>
                <button onClick={() => setServings(servings+1)} style={{ width:28, height:28, borderRadius:"50%", border:"1px solid rgba(255,255,255,0.1)", background:"rgba(255,255,255,0.05)", color:"#fff", fontSize:16, cursor:"pointer" }}>+</button>
              </div>

              {/* Ingredients */}
              <div style={{ background:"rgba(255,255,255,0.03)", borderRadius:14, padding:"16px", marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,122,0,0.8)", textTransform:"uppercase", letterSpacing:1.5 }}>Ingredients</p>
                  <button onClick={() => setShowShopping(true)} style={{ background:"rgba(255,122,0,0.1)", border:"1px solid rgba(255,122,0,0.25)", borderRadius:20, padding:"4px 10px", color:"#FF7A00", fontSize:10, fontWeight:700, cursor:"pointer" }}>🛒 Shopping List</button>
                </div>
                {recipe.ingredients.map((ing,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"7px 0", borderBottom:i<recipe.ingredients.length-1?"1px solid rgba(255,255,255,0.04)":"none" }}>
                    <span style={{ width:5, height:5, borderRadius:"50%", background:"#FF7A00", flexShrink:0 }} />
                    <span style={{ fontSize:13, color:"rgba(255,255,255,0.75)" }}>{scaleIng(ing)}</span>
                  </div>
                ))}
              </div>

              {/* Instructions */}
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,122,0,0.8)", textTransform:"uppercase", letterSpacing:1.5 }}>Instructions</p>
                  <button onClick={() => setShowCooking(true)} style={{ background:"linear-gradient(135deg,rgba(255,122,0,0.15),rgba(255,200,87,0.1))", border:"1px solid rgba(255,122,0,0.3)", borderRadius:20, padding:"5px 12px", color:"#FF7A00", fontSize:11, fontWeight:700, cursor:"pointer" }}>👨‍🍳 Cooking Mode</button>
                </div>
                {recipe.steps.map((step,i) => (
                  <div key={i} style={{ display:"flex", gap:12, marginBottom:14, alignItems:"flex-start" }}>
                    <div style={{ minWidth:26, height:26, borderRadius:"50%", background:"linear-gradient(135deg,#FF7A00,#FFC857)", color:"#0B0B0F", fontWeight:800, fontSize:11, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.65, marginBottom:recipe.stepTimes?.[i]>0?6:0 }}>{step}</p>
                      {recipe.stepTimes?.[i] > 0 && <Timer seconds={recipe.stepTimes[i]} />}
                    </div>
                  </div>
                ))}
              </div>

              {recipe.tip && <div style={{ background:"linear-gradient(135deg,rgba(255,122,0,0.08),rgba(255,200,87,0.06))", border:"1px solid rgba(255,122,0,0.2)", borderRadius:12, padding:"12px 14px", marginBottom:16 }}><span style={{ fontWeight:700, color:"#FF7A00", fontSize:12 }}>👨‍🍳 Chef's Tip  </span><span style={{ fontSize:12, color:"rgba(255,255,255,0.55)", lineHeight:1.6 }}>{recipe.tip}</span></div>}

              {/* YouTube */}
              <a href={`https://www.youtube.com/results?search_query=how+to+make+${encodeURIComponent(recipe.name)}`} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"rgba(255,0,0,0.08)", border:"1px solid rgba(255,0,0,0.2)", borderRadius:12, padding:"12px", color:"#ff4444", fontSize:13, fontWeight:700, marginBottom:14 }}>
                ▶️ Watch How to Make This on YouTube
              </a>

              {/* Feedback */}
              <div style={{ display:"flex", gap:8, marginBottom:14 }}>
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", flex:1, alignSelf:"center" }}>Was this good?</p>
                <button onClick={() => regenerate("up")} style={{ background:feedback==="up"?"rgba(52,211,153,0.15)":"rgba(255,255,255,0.05)", border:"1px solid "+(feedback==="up"?"rgba(52,211,153,0.4)":"rgba(255,255,255,0.1)"), borderRadius:20, padding:"6px 14px", color:feedback==="up"?"#34d399":"#888", fontSize:13, cursor:"pointer", fontWeight:600 }}>👍</button>
                <button onClick={() => regenerate("down")} style={{ background:feedback==="down"?"rgba(255,80,80,0.1)":"rgba(255,255,255,0.05)", border:"1px solid "+(feedback==="down"?"rgba(255,80,80,0.3)":"rgba(255,255,255,0.1)"), borderRadius:20, padding:"6px 14px", color:feedback==="down"?"#ff6b6b":"#888", fontSize:13, cursor:"pointer", fontWeight:600 }}>👎 Try Another</button>
              </div>

              <button onClick={() => generateRecipe()} style={{ width:"100%", padding:"13px", borderRadius:12, border:"1px solid rgba(255,122,0,0.25)", background:"transparent", color:"#FF7A00", fontSize:13, fontWeight:700, cursor:"pointer" }}>🔄 Generate Another</button>
            </div>
          </div>
        )}

        {/* ── EAT OUT ── */}
        {restaurants && (
          <div style={{ animation:"fadeUp 0.5s ease" }}>
            <div style={{ background:"rgba(255,200,87,0.06)", border:"1px solid rgba(255,200,87,0.15)", borderRadius:10, padding:"10px 14px", marginBottom:14, fontSize:12, color:"rgba(255,200,87,0.7)" }}>
              ⚠️ These are suggested restaurant types, not confirmed real locations. Use Google Maps or delivery apps to find actual places near you.
            </div>
            <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:1.5, marginBottom:14 }}>🍴 {cuisine} Restaurants Near You</p>
            {restaurants.map((r,i) => (
              <div key={i} style={{ background:"#121218", borderRadius:20, border:"1px solid rgba(255,255,255,0.06)", marginBottom:16, overflow:"hidden", boxShadow:"0 8px 40px rgba(0,0,0,0.4)" }}>
                <div style={{ padding:"18px 18px 14px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:4 }}>
                    <h3 style={{ fontSize:16, fontWeight:800, color:"#fff" }}>{r.name}</h3>
                    <span style={{ background:"rgba(255,200,87,0.1)", border:"1px solid rgba(255,200,87,0.25)", borderRadius:20, padding:"3px 10px", fontSize:11, color:"#FFC857", fontWeight:700, marginLeft:8, flexShrink:0 }}>{r.priceRange}</span>
                  </div>
                  <p style={{ fontSize:12, color:"rgba(255,255,255,0.3)", lineHeight:1.5 }}>{r.vibe}</p>
                </div>
                <div style={{ height:1, background:"rgba(255,255,255,0.04)", margin:"0 18px" }} />
                <DishMenu dishes={r.menu || r.mustOrder || []} restaurantName={r.name} dishImages={dishImages} cuisine={cuisine} />
                {/* Order buttons */}
                <div style={{ padding:"0 18px 18px", display:"flex", flexDirection:"column", gap:8 }}>
                  <p style={{ fontSize:10, fontWeight:700, color:"rgba(255,255,255,0.25)", textTransform:"uppercase", letterSpacing:1.5 }}>Order Online</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <a href={`https://www.ubereats.com/search?q=${encodeURIComponent((r.menu||r.mustOrder||[])[0]+" "+cuisine)}`} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, background:"rgba(6,181,93,0.1)", border:"1px solid rgba(6,181,93,0.3)", borderRadius:12, padding:"11px 6px", color:"#06B55D", fontSize:12, fontWeight:700 }}>🟢 Uber Eats</a>
                    <a href={`https://www.doordash.com/search/store/${encodeURIComponent(cuisine+" "+r.name)}/`} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, background:"rgba(255,60,60,0.1)", border:"1px solid rgba(255,60,60,0.3)", borderRadius:12, padding:"11px 6px", color:"#FF3C3C", fontSize:12, fontWeight:700 }}>🔴 DoorDash</a>
                    <a href={`https://www.grubhub.com/search?queryText=${encodeURIComponent(cuisine+" "+(r.menu||r.mustOrder||[])[0])}`} target="_blank" rel="noopener noreferrer" style={{ flex:1, display:"flex", alignItems:"center", justifyContent:"center", gap:5, background:"rgba(255,153,0,0.1)", border:"1px solid rgba(255,153,0,0.3)", borderRadius:12, padding:"11px 6px", color:"#FF9900", fontSize:12, fontWeight:700 }}>🟡 GrubHub</a>
                  </div>
                  <a href={`https://www.google.com/maps/search/${encodeURIComponent(r.searchTip)}`} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:12, padding:"10px", color:"rgba(255,255,255,0.4)", fontSize:12, fontWeight:600 }}>📍 Find on Google Maps</a>
                </div>
              </div>
            ))}
            <button onClick={findRestaurants} style={{ width:"100%", padding:"13px", borderRadius:12, border:"1px solid rgba(255,122,0,0.25)", background:"transparent", color:"#FF7A00", fontSize:13, fontWeight:700, cursor:"pointer" }}>🔄 Find Different Restaurants</button>
          </div>
        )}
      </div>
    </div>
  );
}
