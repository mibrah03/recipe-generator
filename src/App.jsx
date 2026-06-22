import { useState, useRef, useEffect } from "react";

const ALL_CUISINES = [
  { label: "🇮🇹 Italian", value: "Italian" },
  { label: "🇯🇵 Japanese", value: "Japanese" },
  { label: "🇲🇽 Mexican", value: "Mexican" },
  { label: "🇮🇳 Indian", value: "Indian" },
  { label: "🇹🇭 Thai", value: "Thai" },
  { label: "🇨🇳 Chinese", value: "Chinese" },
  { label: "🇫🇷 French", value: "French" },
  { label: "🇬🇷 Greek", value: "Greek" },
  { label: "🇪🇸 Spanish", value: "Spanish" },
  { label: "🇱🇧 Lebanese", value: "Lebanese" },
  { label: "🇰🇷 Korean", value: "Korean" },
  { label: "🇲🇦 Moroccan", value: "Moroccan" },
  { label: "🇧🇷 Brazilian", value: "Brazilian" },
  { label: "🇵🇪 Peruvian", value: "Peruvian" },
  { label: "🇳🇬 Nigerian", value: "Nigerian" },
  { label: "🇲🇾 Malaysian", value: "Malaysian" },
  { label: "🇵🇭 Filipino", value: "Filipino" },
  { label: "🇮🇩 Indonesian", value: "Indonesian" },
  { label: "🇸🇬 Singaporean", value: "Singaporean" },
  { label: "🇻🇳 Vietnamese", value: "Vietnamese" },
  { label: "🇹🇷 Turkish", value: "Turkish" },
  { label: "🇮🇷 Persian", value: "Persian" },
  { label: "🇵🇰 Pakistani", value: "Pakistani" },
  { label: "🇱🇰 Sri Lankan", value: "Sri Lankan" },
  { label: "🇧🇩 Bangladeshi", value: "Bangladeshi" },
  { label: "🇸🇦 Saudi Arabian", value: "Saudi Arabian" },
  { label: "🇩🇪 German", value: "German" },
  { label: "🇬🇧 British", value: "British" },
  { label: "🇵🇹 Portuguese", value: "Portuguese" },
  { label: "🇷🇺 Russian", value: "Russian" },
  { label: "🇵🇱 Polish", value: "Polish" },
  { label: "🇺🇦 Ukrainian", value: "Ukrainian" },
  { label: "🇦🇷 Argentinian", value: "Argentinian" },
  { label: "🇨🇴 Colombian", value: "Colombian" },
  { label: "🇨🇱 Chilean", value: "Chilean" },
  { label: "🇺🇸 American", value: "American" },
  { label: "🇨🇦 Canadian", value: "Canadian" },
  { label: "🇯🇲 Jamaican", value: "Jamaican" },
  { label: "🇨🇺 Cuban", value: "Cuban" },
  { label: "🇪🇹 Ethiopian", value: "Ethiopian" },
  { label: "🇬🇭 Ghanaian", value: "Ghanaian" },
  { label: "🇸🇳 Senegalese", value: "Senegalese" },
  { label: "🇰🇪 Kenyan", value: "Kenyan" },
  { label: "🇸🇴 Somali", value: "Somali" },
  { label: "🇿🇦 South African", value: "South African" },
  { label: "🇦🇺 Australian", value: "Australian" },
  { label: "🇳🇿 New Zealand", value: "New Zealand" },
  { label: "🇹🇼 Taiwanese", value: "Taiwanese" },
  { label: "🇪🇬 Egyptian", value: "Egyptian" },
  { label: "🇹🇳 Tunisian", value: "Tunisian" },
  { label: "🇭🇺 Hungarian", value: "Hungarian" },
  { label: "🇷🇴 Romanian", value: "Romanian" },
  { label: "🇧🇪 Belgian", value: "Belgian" },
  { label: "🇨🇭 Swiss", value: "Swiss" },
  { label: "🇫🇯 Fijian", value: "Fijian" },
  { label: "🇾🇪 Yemeni", value: "Yemeni" },
  { label: "🇯🇴 Jordanian", value: "Jordanian" },
  { label: "🇮🇱 Israeli", value: "Israeli" },
  { label: "🇹🇹 Trinidadian", value: "Trinidadian" },
  { label: "🇭🇹 Haitian", value: "Haitian" },
];

const MEAL_STYLES = [
  { label: "🍽️ No Restriction", value: "" },
  { label: "🥩 Non-Vegetarian", value: "non-vegetarian" },
  { label: "🌱 Vegetarian", value: "vegetarian" },
  { label: "🥦 Vegan", value: "vegan" },
  { label: "🐟 Pescatarian", value: "pescatarian" },
  { label: "🌾 Gluten-Free", value: "gluten-free" },
  { label: "🥛 Dairy-Free", value: "dairy-free" },
  { label: "🥑 Keto", value: "keto (low carb, high fat)" },
  { label: "💪 High Protein", value: "high protein" },
];

const MEAL_TYPES = [
  { label: "🎲 Surprise Me!", value: "any type of dish" },
  { label: "🍜 Noodles & Pasta", value: "noodles or pasta" },
  { label: "🥘 Stew & Curry", value: "stew or curry" },
  { label: "🥗 Salad", value: "salad" },
  { label: "🍲 Soup", value: "soup" },
  { label: "🔥 Grilled", value: "grilled dish" },
  { label: "🥩 Meat", value: "meat dish" },
  { label: "🐟 Seafood", value: "seafood dish" },
  { label: "🌱 Vegetarian Dish", value: "vegetarian dish" },
  { label: "🥚 Breakfast", value: "breakfast" },
  { label: "🍰 Dessert", value: "dessert" },
  { label: "🫓 Bread & Pastry", value: "bread or pastry" },
];

const TAG_COLORS = ["#ffd200","#f7971e","#a78bfa","#34d399","#60a5fa","#f472b6","#fb923c"];

// Generic Dropdown
function Dropdown({ label, value, onChange, options, placeholder }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  const selected = options.find(o => o.value === value);
  return (
    <div ref={ref} style={{ position: "relative", marginBottom: 14 }}>
      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 7 }}>{label}</label>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "11px 14px", borderRadius: 11,
        border: "2px solid " + (value ? "#ffd200" : "rgba(255,255,255,0.15)"),
        background: value ? "rgba(255,210,0,0.08)" : "rgba(255,255,255,0.05)",
        color: value ? "#ffd200" : "#888", fontSize: 14, fontWeight: value ? 600 : 400,
        cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span>{selected ? selected.label : placeholder}</span>
        <span style={{ fontSize: 10, opacity: 0.5, marginLeft: 8 }}>{open ? "▲" : "▼"}</span>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 5px)", left: 0, right: 0, zIndex: 200,
          background: "#1a1535", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          maxHeight: 260, overflowY: "auto",
        }}>
          {options.map(o => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }} style={{
              width: "100%", padding: "10px 14px", background: value === o.value ? "rgba(255,210,0,0.12)" : "transparent",
              border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
              color: value === o.value ? "#ffd200" : "#ccc", fontSize: 13,
              cursor: "pointer", textAlign: "left", display: "block",
              fontWeight: value === o.value ? 700 : 400,
            }}>{o.label}</button>
          ))}
        </div>
      )}
    </div>
  );
}

// Cuisine Search Input with suggestions
function CuisineSearch({ cuisine, setCuisine }) {
  const [input, setInput] = useState(cuisine || "");
  const [suggestions, setSuggestions] = useState([]);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const handleInput = (val) => {
    setInput(val);
    if (val.trim().length === 0) { setSuggestions([]); setOpen(false); setCuisine(""); return; }
    const filtered = ALL_CUISINES.filter(c =>
      c.label.toLowerCase().includes(val.toLowerCase()) ||
      c.value.toLowerCase().includes(val.toLowerCase())
    ).slice(0, 8);
    setSuggestions(filtered);
    setOpen(true);
    // Also allow free text (custom cuisines not in list)
    setCuisine(val);
  };

  const select = (c) => {
    setInput(c.label);
    setCuisine(c.value);
    setSuggestions([]);
    setOpen(false);
  };

  return (
    <div ref={ref} style={{ position: "relative", marginBottom: 14 }}>
      <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 7 }}>
        🌍 Country or Cuisine
      </label>
      <div style={{
        display: "flex", alignItems: "center",
        border: "2px solid " + (cuisine ? "#ffd200" : "rgba(255,255,255,0.15)"),
        borderRadius: 11, background: "rgba(255,255,255,0.05)", overflow: "hidden",
      }}>
        <input
          value={input}
          onChange={e => handleInput(e.target.value)}
          onFocus={() => { if (suggestions.length > 0) setOpen(true); }}
          placeholder="e.g. Italian, Nigerian, Sushi, Tapas..."
          style={{
            flex: 1, padding: "11px 14px", background: "transparent",
            border: "none", outline: "none", color: "#fff", fontSize: 14,
          }}
        />
        {input && (
          <button onClick={() => { setInput(""); setCuisine(""); setSuggestions([]); setOpen(false); }} style={{
            background: "transparent", border: "none", color: "#888", fontSize: 18,
            cursor: "pointer", padding: "0 12px",
          }}>×</button>
        )}
      </div>
      {open && suggestions.length > 0 && (
        <div style={{
          position: "absolute", top: "calc(100% + 5px)", left: 0, right: 0, zIndex: 200,
          background: "#1a1535", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 12, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
        }}>
          {suggestions.map(c => (
            <button key={c.value} onClick={() => select(c)} style={{
              width: "100%", padding: "10px 14px", background: "transparent",
              border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
              color: "#ddd", fontSize: 13, cursor: "pointer", textAlign: "left",
              display: "flex", alignItems: "center", gap: 8,
            }}>
              <span style={{ fontSize: 18 }}>{c.label.split(" ")[0]}</span>
              <span>{c.label.split(" ").slice(1).join(" ")}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("cook");
  const [mode, setMode] = useState("random");
  const [cuisine, setCuisine] = useState("");
  const [mealStyle, setMealStyle] = useState("");
  const [mealType, setMealType] = useState("");
  const [pantryInput, setPantryInput] = useState("");
  const [pantryItems, setPantryItems] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [restaurants, setRestaurants] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareMsg, setShareMsg] = useState("");

  const addPantryItem = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const val = pantryInput.trim().replace(/,$/, "");
      if (val && !pantryItems.includes(val)) setPantryItems([...pantryItems, val]);
      setPantryInput("");
    }
  };
  const addPantryItemOnBlur = () => {
    const val = pantryInput.trim().replace(/,$/, "");
    if (val && !pantryItems.includes(val)) setPantryItems([...pantryItems, val]);
    setPantryInput("");
  };
  const removeItem = (item) => setPantryItems(pantryItems.filter(i => i !== item));

  const fetchImage = async (recipeName, cuisineName) => {
    setImageLoading(true); setRecipeImage(null);
    try {
      const wikiRes = await fetch("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + encodeURIComponent(recipeName + " food") + "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&format=json&origin=*");
      const wikiData = await wikiRes.json();
      const pages = wikiData.query?.pages;
      if (pages) {
        for (const page of Object.values(pages)) {
          const info = page.imageinfo?.[0];
          if (info?.mime?.startsWith("image/") && /\.(jpg|jpeg|png|webp)/i.test(info.url) && !info.url.includes("Flag") && !info.url.includes("Map") && !info.url.includes("Logo")) {
            setRecipeImage(info.url); setImageLoading(false); return;
          }
        }
      }
      const fb = await fetch("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + encodeURIComponent(cuisineName + " food dish") + "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&format=json&origin=*");
      const fbPages = (await fb.json()).query?.pages;
      if (fbPages) {
        for (const page of Object.values(fbPages)) {
          const info = page.imageinfo?.[0];
          if (info?.mime?.startsWith("image/") && /\.(jpg|jpeg|png|webp)/i.test(info.url) && !info.url.includes("Flag") && !info.url.includes("Map")) {
            setRecipeImage(info.url); setImageLoading(false); return;
          }
        }
      }
    } catch (e) {}
    setImageLoading(false);
  };

  const getLocation = () => new Promise((res, rej) => {
    if (!navigator.geolocation) rej();
    else navigator.geolocation.getCurrentPosition(res, rej);
  });

  const generateRecipe = async () => {
    if (!cuisine) { setError("Type a country or cuisine first!"); return; }
    if (mode === "random" && !mealType) { setError("Pick a meal type!"); return; }
    if (mode === "pantry" && pantryItems.length === 0) { setError("Add at least one ingredient!"); return; }
    setError(""); setLoading(true); setRecipe(null); setRecipeImage(null);
    const styleText = mealStyle ? ` The recipe must be ${mealStyle}.` : "";
    const prompt = mode === "random"
      ? `Generate a random authentic ${cuisine} ${mealType} recipe.${styleText}`
      : `Generate an authentic ${cuisine} recipe using ONLY or mostly these ingredients: ${pantryItems.join(", ")}. Assume basic staples like salt, pepper, oil, garlic, onion are available.${styleText}`;
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: `${prompt} Respond ONLY with JSON, no markdown: {"name":"Recipe Name","description":"One sentence","time":30,"difficulty":"Easy","servings":4,"ingredients":["item with qty"],"steps":["Step 1"],"tip":"Chef tip"}` }] })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim());
      setRecipe(parsed);
      fetchImage(parsed.name, cuisine);
    } catch (err) { setError("Something went wrong. Try again!"); }
    setLoading(false);
  };

  const findRestaurants = async () => {
    if (!cuisine) { setError("Type a country or cuisine first!"); return; }
    setError(""); setLoading(true); setRestaurants(null);
    try {
      let locationText = "The user's location is unknown.";
      try { const pos = await getLocation(); locationText = `User is at lat ${pos.coords.latitude}, lng ${pos.coords.longitude}.`; } catch(e) {}
      const styleText = mealStyle ? ` The user prefers ${mealStyle} food.` : "";
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: `${locationText}${styleText} The user wants ${cuisine} food. Suggest 3 types of ${cuisine} restaurants and 4-5 must-order dishes each. Respond ONLY with JSON: {"restaurants":[{"name":"Restaurant type","vibe":"Atmosphere description","mustOrder":["Dish 1","Dish 2","Dish 3","Dish 4"],"priceRange":"$$","searchTip":"What to Google Maps search"}]}` }] })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim());
      setRestaurants(parsed.restaurants);
    } catch (err) { setError("Something went wrong. Try again!"); }
    setLoading(false);
  };

  const shareRecipe = async () => {
    if (!recipe) return;
    const text = `🍽️ ${recipe.name}\n\n${recipe.description}\n\n⏱️ ${recipe.time} min | 📊 ${recipe.difficulty} | Serves ${recipe.servings}\n\n🛒 Ingredients:\n${recipe.ingredients.map(i => "• " + i).join("\n")}\n\nGenerated by What Should I Cook?`;
    try {
      if (navigator.share) await navigator.share({ title: recipe.name, text });
      else { await navigator.clipboard.writeText(text); setShareMsg("Copied!"); setTimeout(() => setShareMsg(""), 2500); }
    } catch (e) {}
  };

  const reset = () => { setRecipe(null); setRestaurants(null); setRecipeImage(null); setError(""); };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff", padding: "24px 16px", overflowX: "hidden" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        input::placeholder { color: #555; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 4px; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 44, marginBottom: 6 }}>🍽️</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, margin: 0, background: "linear-gradient(90deg, #f7971e, #ffd200)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>What Should I Cook?</h1>
        <p style={{ color: "#a89ec9", marginTop: 5, fontSize: 13 }}>Discover recipes or find restaurants near you.</p>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Sliding Tab Switch */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 5, marginBottom: 20, border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
          <div style={{
            position: "absolute", top: 5, bottom: 5,
            left: tab === "cook" ? 5 : "calc(50% + 3px)",
            width: "calc(50% - 8px)",
            background: "linear-gradient(90deg, #f7971e, #ffd200)",
            borderRadius: 12, transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
            pointerEvents: "none",
          }} />
          <button onClick={() => { setTab("cook"); reset(); }} style={{ flex: 1, padding: "13px 0", border: "none", background: "transparent", color: tab === "cook" ? "#1a1a2e" : "#a89ec9", fontSize: 15, fontWeight: tab === "cook" ? 800 : 500, cursor: "pointer", position: "relative", zIndex: 1, borderRadius: 12 }}>
            👨‍🍳 Cook
          </button>
          <button onClick={() => { setTab("eat"); reset(); }} style={{ flex: 1, padding: "13px 0", border: "none", background: "transparent", color: tab === "eat" ? "#1a1a2e" : "#a89ec9", fontSize: 15, fontWeight: tab === "eat" ? 800 : 500, cursor: "pointer", position: "relative", zIndex: 1, borderRadius: 12 }}>
            🍴 Eat Out
          </button>
        </div>

        {/* Cook sub tabs */}
        {tab === "cook" && (
          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 11, padding: 4, marginBottom: 14, border: "1px solid rgba(255,255,255,0.07)" }}>
            {[["random","🎲 Random Recipe"],["pantry","🧺 Use What I Have"]].map(([val, lbl]) => (
              <button key={val} onClick={() => { setMode(val); reset(); }} style={{
                flex: 1, padding: "9px 0", borderRadius: 9, border: "none",
                background: mode === val ? "rgba(255,255,255,0.12)" : "transparent",
                color: mode === val ? "#fff" : "#a89ec9",
                fontSize: 13, fontWeight: mode === val ? 700 : 400, cursor: "pointer",
              }}>{lbl}</button>
            ))}
          </div>
        )}

        {/* Cuisine typed search */}
        <CuisineSearch cuisine={cuisine} setCuisine={(v) => { setCuisine(v); reset(); }} />

        {/* Meal Style Dropdown */}
        <Dropdown
          label="🥗 Meal Style"
          value={mealStyle}
          onChange={setMealStyle}
          options={MEAL_STYLES}
          placeholder="Select a meal style..."
        />

        {/* Meal Type Dropdown — Cook only */}
        {tab === "cook" && mode === "random" && (
          <Dropdown
            label="🍽️ Meal Type"
            value={mealType}
            onChange={setMealType}
            options={MEAL_TYPES}
            placeholder="Select a meal type..."
          />
        )}

        {/* Pantry */}
        {tab === "cook" && mode === "pantry" && (
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 7 }}>🧺 What's in your kitchen?</label>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.15)", borderRadius: 11, padding: "10px 12px", display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center", minHeight: 48 }}>
              {pantryItems.map((item, i) => (
                <span key={item} style={{ background: `${TAG_COLORS[i % TAG_COLORS.length]}22`, border: `1px solid ${TAG_COLORS[i % TAG_COLORS.length]}55`, color: TAG_COLORS[i % TAG_COLORS.length], borderRadius: 999, padding: "3px 11px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                  {item}<span onClick={() => removeItem(item)} style={{ cursor: "pointer", opacity: 0.7, fontSize: 14 }}>×</span>
                </span>
              ))}
              <input value={pantryInput} onChange={e => setPantryInput(e.target.value)} onKeyDown={addPantryItem} onBlur={addPantryItemOnBlur}
                placeholder={pantryItems.length === 0 ? "Type ingredient & press Enter..." : "Add more..."}
                style={{ flex: 1, minWidth: 140, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 13 }} />
            </div>
            <p style={{ color: "#6b6590", fontSize: 12, marginTop: 5 }}>Press <strong style={{ color: "#a89ec9" }}>Enter</strong> after each ingredient.</p>
          </div>
        )}

        {error && <p style={{ color: "#ff6b6b", textAlign: "center", marginBottom: 12, fontSize: 13 }}>{error}</p>}

        {/* Action Button */}
        <button onClick={tab === "cook" ? generateRecipe : findRestaurants} disabled={loading} style={{
          width: "100%", padding: "15px", borderRadius: 13, border: "none",
          background: loading ? "#444" : "linear-gradient(90deg, #f7971e, #ffd200)",
          color: loading ? "#888" : "#1a1a2e", fontSize: 15, fontWeight: 800,
          cursor: loading ? "not-allowed" : "pointer",
          boxShadow: loading ? "none" : "0 4px 24px rgba(247,151,30,0.35)",
          marginBottom: 20, transition: "all 0.2s",
        }}>
          {loading ? "✨ Finding the best option..."
            : tab === "eat" ? "🍴 Find Restaurants Near Me"
            : mode === "pantry" ? "🧺 Cook With What I Have"
            : "🍽️ Generate Recipe"}
        </button>

        {/* Recipe Card */}
        {recipe && (
          <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 18, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", animation: "fadeSlideUp 0.4s ease" }}>
            <div style={{ width: "100%", height: 210, background: "rgba(255,255,255,0.04)", position: "relative", overflow: "hidden" }}>
              {imageLoading && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}><div style={{ width: 32, height: 32, borderRadius: "50%", border: "3px solid rgba(255,210,0,0.2)", borderTopColor: "#ffd200", animation: "spin 0.8s linear infinite" }} /><span style={{ color: "#a89ec9", fontSize: 12 }}>Loading photo...</span></div>}
              {recipeImage && <img src={recipeImage} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setRecipeImage(null)} />}
              {!imageLoading && !recipeImage && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 56 }}>🍽️</div>}
              {recipeImage && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 70, background: "linear-gradient(to top, rgba(15,12,41,0.9), transparent)" }} />}
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: "#fff", flex: 1 }}>{recipe.name}</h2>
                <button onClick={shareRecipe} style={{ background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.3)", borderRadius: 20, padding: "5px 13px", color: "#ffd200", fontSize: 12, fontWeight: 700, cursor: "pointer", marginLeft: 10, whiteSpace: "nowrap" }}>{shareMsg || "📤 Share"}</button>
              </div>
              <p style={{ color: "#a89ec9", fontSize: 13, margin: "0 0 14px", lineHeight: 1.5 }}>{recipe.description}</p>
              <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
                {[{ icon: "⏱️", label: `${recipe.time} min` }, { icon: "📊", label: recipe.difficulty }, { icon: "🍽️", label: `Serves ${recipe.servings}` }].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,210,0,0.08)", border: "1px solid rgba(255,210,0,0.2)", borderRadius: 999, padding: "4px 12px", fontSize: 12, color: "#ffd200", fontWeight: 600 }}>{s.icon} {s.label}</div>
                ))}
              </div>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Ingredients</h3>
              <ul style={{ margin: "0 0 16px", paddingLeft: 18 }}>
                {recipe.ingredients.map((ing, i) => <li key={i} style={{ color: "#ddd", fontSize: 13, marginBottom: 4 }}>{ing}</li>)}
              </ul>
              <h3 style={{ fontSize: 11, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Instructions</h3>
              {recipe.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg, #f7971e, #ffd200)", color: "#1a1a2e", fontWeight: 800, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ color: "#ddd", fontSize: 13, margin: 0, lineHeight: 1.6 }}>{step}</p>
                </div>
              ))}
              {recipe.tip && <div style={{ background: "rgba(247,151,30,0.08)", border: "1px solid rgba(247,151,30,0.2)", borderRadius: 10, padding: "10px 14px", marginBottom: 14 }}><span style={{ fontWeight: 700, color: "#f7971e", fontSize: 12 }}>👨‍🍳 Chef's Tip: </span><span style={{ color: "#ccc", fontSize: 12 }}>{recipe.tip}</span></div>}
              <button onClick={generateRecipe} style={{ width: "100%", padding: "11px", borderRadius: 11, border: "2px solid rgba(255,210,0,0.25)", background: "transparent", color: "#ffd200", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🍽️ Try Another Recipe</button>
            </div>
          </div>
        )}

        {/* Eat Out Results */}
        {restaurants && (
          <div style={{ animation: "fadeSlideUp 0.4s ease" }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: "#ffd200", marginBottom: 14 }}>🍴 {cuisine} Restaurants to Look For</h2>
            {restaurants.map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 15, border: "1px solid rgba(255,255,255,0.1)", padding: 18, marginBottom: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                  <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: "#fff" }}>{r.name}</h3>
                  <span style={{ background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.2)", borderRadius: 999, padding: "2px 9px", fontSize: 11, color: "#ffd200", fontWeight: 700, marginLeft: 8 }}>{r.priceRange}</span>
                </div>
                <p style={{ color: "#a89ec9", fontSize: 12, margin: "0 0 10px" }}>{r.vibe}</p>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Must Order</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
                  {r.mustOrder.map((dish, j) => (
                    <span key={j} style={{ background: "rgba(247,151,30,0.1)", border: "1px solid rgba(247,151,30,0.2)", borderRadius: 999, padding: "3px 10px", fontSize: 11, color: "#f7971e" }}>{dish}</span>
                  ))}
                </div>
                <a href={`https://www.google.com/maps/search/${encodeURIComponent(r.searchTip)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.25)", borderRadius: 18, padding: "6px 14px", color: "#ffd200", fontSize: 11, fontWeight: 700, textDecoration: "none" }}>📍 Find on Google Maps</a>
              </div>
            ))}
            <button onClick={findRestaurants} style={{ width: "100%", padding: "11px", borderRadius: 11, border: "2px solid rgba(255,210,0,0.25)", background: "transparent", color: "#ffd200", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>🔄 Find Different Restaurants</button>
          </div>
        )}

      </div>
    </div>
  );
}
