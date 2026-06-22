import { useState, useRef, useEffect } from "react";

const CUISINE_TYPES = [
  {
    name: "🌊 Mediterranean",
    countries: [
      { label: "🇮🇹 Italian", value: "Italian" },
      { label: "🇬🇷 Greek", value: "Greek" },
      { label: "🇪🇸 Spanish", value: "Spanish" },
      { label: "🇵🇹 Portuguese", value: "Portuguese" },
      { label: "🇱🇧 Lebanese", value: "Lebanese" },
      { label: "🇹🇷 Turkish", value: "Turkish" },
      { label: "🇮🇱 Israeli", value: "Israeli" },
      { label: "🇲🇦 Moroccan", value: "Moroccan" },
      { label: "🇹🇳 Tunisian", value: "Tunisian" },
      { label: "🇪🇬 Egyptian", value: "Egyptian" },
    ],
  },
  {
    name: "🌏 East Asian",
    countries: [
      { label: "🇯🇵 Japanese", value: "Japanese" },
      { label: "🇨🇳 Chinese", value: "Chinese" },
      { label: "🇰🇷 Korean", value: "Korean" },
      { label: "🇹🇼 Taiwanese", value: "Taiwanese" },
    ],
  },
  {
    name: "🌴 Southeast Asian",
    countries: [
      { label: "🇲🇾 Malaysian", value: "Malaysian" },
      { label: "🇵🇭 Filipino", value: "Filipino" },
      { label: "🇮🇩 Indonesian", value: "Indonesian" },
      { label: "🇸🇬 Singaporean", value: "Singaporean" },
      { label: "🇹🇭 Thai", value: "Thai" },
      { label: "🇻🇳 Vietnamese", value: "Vietnamese" },
    ],
  },
  {
    name: "🛕 South Asian",
    countries: [
      { label: "🇮🇳 Indian", value: "Indian" },
      { label: "🇵🇰 Pakistani", value: "Pakistani" },
      { label: "🇱🇰 Sri Lankan", value: "Sri Lankan" },
      { label: "🇧🇩 Bangladeshi", value: "Bangladeshi" },
    ],
  },
  {
    name: "🕌 Middle Eastern",
    countries: [
      { label: "🇮🇷 Persian", value: "Persian" },
      { label: "🇸🇦 Saudi Arabian", value: "Saudi Arabian" },
      { label: "🇾🇪 Yemeni", value: "Yemeni" },
      { label: "🇯🇴 Jordanian", value: "Jordanian" },
    ],
  },
  {
    name: "🥐 Western European",
    countries: [
      { label: "🇫🇷 French", value: "French" },
      { label: "🇩🇪 German", value: "German" },
      { label: "🇬🇧 British", value: "British" },
      { label: "🇧🇪 Belgian", value: "Belgian" },
      { label: "🇨🇭 Swiss", value: "Swiss" },
    ],
  },
  {
    name: "🏰 Eastern European",
    countries: [
      { label: "🇷🇺 Russian", value: "Russian" },
      { label: "🇵🇱 Polish", value: "Polish" },
      { label: "🇺🇦 Ukrainian", value: "Ukrainian" },
      { label: "🇷🇴 Romanian", value: "Romanian" },
      { label: "🇭🇺 Hungarian", value: "Hungarian" },
    ],
  },
  {
    name: "🌮 Latin American",
    countries: [
      { label: "🇲🇽 Mexican", value: "Mexican" },
      { label: "🇧🇷 Brazilian", value: "Brazilian" },
      { label: "🇵🇪 Peruvian", value: "Peruvian" },
      { label: "🇦🇷 Argentinian", value: "Argentinian" },
      { label: "🇨🇴 Colombian", value: "Colombian" },
      { label: "🇨🇱 Chilean", value: "Chilean" },
    ],
  },
  {
    name: "🌴 Caribbean",
    countries: [
      { label: "🇯🇲 Jamaican", value: "Jamaican" },
      { label: "🇨🇺 Cuban", value: "Cuban" },
      { label: "🇹🇹 Trinidadian", value: "Trinidadian" },
      { label: "🇭🇹 Haitian", value: "Haitian" },
    ],
  },
  {
    name: "🦅 North American",
    countries: [
      { label: "🇺🇸 American", value: "American" },
      { label: "🇨🇦 Canadian", value: "Canadian" },
    ],
  },
  {
    name: "🌍 African",
    countries: [
      { label: "🇳🇬 Nigerian", value: "Nigerian" },
      { label: "🇬🇭 Ghanaian", value: "Ghanaian" },
      { label: "🇸🇳 Senegalese", value: "Senegalese" },
      { label: "🇪🇹 Ethiopian", value: "Ethiopian" },
      { label: "🇰🇪 Kenyan", value: "Kenyan" },
      { label: "🇸🇴 Somali", value: "Somali" },
      { label: "🇿🇦 South African", value: "South African" },
    ],
  },
  {
    name: "🦘 Oceanian",
    countries: [
      { label: "🇦🇺 Australian", value: "Australian" },
      { label: "🇳🇿 New Zealand", value: "New Zealand" },
      { label: "🇫🇯 Fijian", value: "Fijian" },
    ],
  },
];

const ALL_COUNTRIES = CUISINE_TYPES.flatMap(c => c.countries);

const MEAL_STYLES = [
  { label: "🥩 Non-Vegetarian", value: "non-vegetarian" },
  { label: "🌱 Vegetarian", value: "vegetarian" },
  { label: "🥦 Vegan", value: "vegan" },
  { label: "🐟 Pescatarian", value: "pescatarian (seafood and fish only, no meat)" },
  { label: "🌾 Gluten-Free", value: "gluten-free" },
  { label: "🥛 Dairy-Free", value: "dairy-free" },
  { label: "🥑 Keto", value: "keto (low carb, high fat)" },
  { label: "💪 High Protein", value: "high protein" },
  { label: "🍽️ No Restriction", value: "" },
];

const MEAL_TYPES = [
  { label: "🍜 Noodles & Pasta", value: "noodles or pasta" },
  { label: "🥘 Stew & Curry", value: "stew or curry" },
  { label: "🥗 Salad", value: "salad" },
  { label: "🍲 Soup", value: "soup" },
  { label: "🔥 Grilled", value: "grilled dish" },
  { label: "🥩 Meat", value: "meat dish" },
  { label: "🐟 Seafood", value: "seafood dish" },
  { label: "🥚 Breakfast", value: "breakfast" },
  { label: "🍰 Dessert", value: "dessert" },
  { label: "🫓 Bread & Pastry", value: "bread or pastry" },
  { label: "🎲 Surprise Me!", value: "any type of dish" },
];

const TAG_COLORS = ["#ffd200","#f7971e","#a78bfa","#34d399","#60a5fa","#f472b6","#fb923c"];

function CuisineDropdown({ cuisine, setCuisine }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openType, setOpenType] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = search.trim()
    ? ALL_COUNTRIES.filter(c => c.label.toLowerCase().includes(search.toLowerCase()) || c.value.toLowerCase().includes(search.toLowerCase()))
    : null;

  const selected = ALL_COUNTRIES.find(c => c.value === cuisine);

  return (
    <div ref={ref} style={{ position: "relative", marginBottom: 16 }}>
      <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
        🌍 Choose a Cuisine
      </label>
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "12px 16px", borderRadius: 12,
        border: "2px solid " + (cuisine ? "#ffd200" : "rgba(255,255,255,0.15)"),
        background: cuisine ? "rgba(255,210,0,0.1)" : "rgba(255,255,255,0.05)",
        color: cuisine ? "#ffd200" : "#888", fontSize: 14, fontWeight: cuisine ? 700 : 400,
        cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span>{selected ? selected.label : "Select a cuisine..."}</span>
        <span style={{ fontSize: 10, opacity: 0.6 }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 6px)", left: 0, right: 0, zIndex: 100,
          background: "#1a1535", border: "1px solid rgba(255,255,255,0.15)",
          borderRadius: 14, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
          maxHeight: 380, overflowY: "auto",
        }}>
          <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, background: "#1a1535", zIndex: 10 }}>
            <input autoFocus value={search} onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search country..."
              style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box" }} />
          </div>

          {filtered ? (
            <div style={{ padding: "6px 0" }}>
              {filtered.length === 0
                ? <div style={{ padding: "12px 16px", color: "#888", fontSize: 13 }}>No results found</div>
                : filtered.map(c => (
                  <button key={c.value} onClick={() => { setCuisine(c.value); setOpen(false); setSearch(""); }} style={{
                    width: "100%", padding: "9px 16px", background: cuisine === c.value ? "rgba(255,210,0,0.1)" : "transparent",
                    border: "none", color: cuisine === c.value ? "#ffd200" : "#ddd", fontSize: 13, cursor: "pointer", textAlign: "left",
                  }}>{c.label}</button>
                ))}
            </div>
          ) : (
            CUISINE_TYPES.map(type => (
              <div key={type.name}>
                <button onClick={() => setOpenType(openType === type.name ? null : type.name)} style={{
                  width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.04)",
                  border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)",
                  color: "#ffd200", fontSize: 13, fontWeight: 700, cursor: "pointer", textAlign: "left",
                  display: "flex", justifyContent: "space-between",
                }}>
                  {type.name} <span style={{ opacity: 0.5, fontSize: 10 }}>{openType === type.name ? "▲" : "▼"}</span>
                </button>
                {openType === type.name && (
                  <div style={{ padding: "4px 0", background: "rgba(0,0,0,0.2)" }}>
                    {type.countries.map(c => (
                      <button key={c.value} onClick={() => { setCuisine(c.value); setOpen(false); setSearch(""); }} style={{
                        width: "100%", padding: "9px 28px", background: cuisine === c.value ? "rgba(255,210,0,0.1)" : "transparent",
                        border: "none", color: cuisine === c.value ? "#ffd200" : "#ccc", fontSize: 13, cursor: "pointer", textAlign: "left",
                      }}>{c.label}</button>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("cook");
  const [sliding, setSliding] = useState(false);
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

  const switchTab = (newTab) => {
    if (newTab === tab || sliding) return;
    setSliding(true);
    setTimeout(() => {
      setTab(newTab);
      setSliding(false);
      reset();
    }, 250);
  };

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
      const fb = await fetch("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" + encodeURIComponent(cuisineName + " cuisine dish") + "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&format=json&origin=*");
      const fbData = await fb.json();
      const fbPages = fbData.query?.pages;
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

  const getLocation = () => new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject();
    else navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const generateRecipe = async () => {
    if (!cuisine) { setError("Pick a cuisine first!"); return; }
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
    if (!cuisine) { setError("Pick a cuisine first!"); return; }
    setError(""); setLoading(true); setRestaurants(null);
    try {
      let locationText = "The user's location is unknown.";
      try { const pos = await getLocation(); locationText = `User is at lat ${pos.coords.latitude}, lng ${pos.coords.longitude}.`; } catch(e) {}
      const styleText = mealStyle ? ` The user prefers ${mealStyle} food.` : "";
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: `${locationText}${styleText} The user wants ${cuisine} food. Suggest 3 types of ${cuisine} restaurants to look for and 4-5 must-order dishes each. Respond ONLY with JSON: {"restaurants":[{"name":"Type name","vibe":"Atmosphere","mustOrder":["Dish 1","Dish 2","Dish 3","Dish 4"],"priceRange":"$$","searchTip":"What to search on Google Maps"}]}` }] })
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

  const pillBtn = (active, onClick, label) => (
    <button onClick={onClick} style={{
      padding: "7px 14px", borderRadius: 999, cursor: "pointer", fontSize: 13,
      border: active ? "2px solid #f7971e" : "2px solid rgba(255,255,255,0.15)",
      background: active ? "rgba(247,151,30,0.15)" : "rgba(255,255,255,0.05)",
      color: active ? "#f7971e" : "#ccc", fontWeight: active ? 700 : 400, transition: "all 0.15s",
    }}>{label}</button>
  );

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff", padding: "24px 16px", overflowX: "hidden" }}>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideOut { from { opacity: 1; } to { opacity: 0; } }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🍽️</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, background: "linear-gradient(90deg, #f7971e, #ffd200)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>What Should I Cook?</h1>
        <p style={{ color: "#a89ec9", marginTop: 6, fontSize: 14 }}>Discover recipes or find restaurants near you.</p>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto" }}>

        {/* Sliding Tab Switch */}
        <div style={{ display: "flex", background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 5, marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)", position: "relative" }}>
          {/* Sliding indicator */}
          <div style={{
            position: "absolute", top: 5, bottom: 5,
            left: tab === "cook" ? 5 : "calc(50% + 3px)",
            width: "calc(50% - 8px)",
            background: "linear-gradient(90deg, #f7971e, #ffd200)",
            borderRadius: 12, transition: "left 0.3s cubic-bezier(0.4,0,0.2,1)",
          }} />
          <button onClick={() => switchTab("cook")} style={{
            flex: 1, padding: "14px 0", border: "none", background: "transparent",
            color: tab === "cook" ? "#1a1a2e" : "#a89ec9",
            fontSize: 15, fontWeight: tab === "cook" ? 800 : 500, cursor: "pointer",
            position: "relative", zIndex: 1, transition: "color 0.3s", borderRadius: 12,
          }}>👨‍🍳 Cook</button>
          <button onClick={() => switchTab("eat")} style={{
            flex: 1, padding: "14px 0", border: "none", background: "transparent",
            color: tab === "eat" ? "#1a1a2e" : "#a89ec9",
            fontSize: 15, fontWeight: tab === "eat" ? 800 : 500, cursor: "pointer",
            position: "relative", zIndex: 1, transition: "color 0.3s", borderRadius: 12,
          }}>🍴 Eat Out</button>
        </div>

        {/* Content with slide animation */}
        <div style={{ animation: sliding ? "slideOut 0.25s ease" : (tab === "cook" ? "slideInLeft 0.3s ease" : "slideInRight 0.3s ease") }}>

          {/* Cook sub tabs */}
          {tab === "cook" && (
            <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4, marginBottom: 16, border: "1px solid rgba(255,255,255,0.08)" }}>
              {[["random","🎲 Random Recipe"],["pantry","🧺 Use What I Have"]].map(([val, lbl]) => (
                <button key={val} onClick={() => { setMode(val); reset(); }} style={{
                  flex: 1, padding: "10px 0", borderRadius: 10, border: "none",
                  background: mode === val ? "rgba(255,255,255,0.12)" : "transparent",
                  color: mode === val ? "#fff" : "#a89ec9",
                  fontSize: 13, fontWeight: mode === val ? 700 : 400, cursor: "pointer",
                }}>{lbl}</button>
              ))}
            </div>
          )}

          {/* Cuisine Dropdown */}
          <CuisineDropdown cuisine={cuisine} setCuisine={(v) => { setCuisine(v); reset(); }} />

          {/* Meal Style */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 8 }}>🥗 Meal Style</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {MEAL_STYLES.map(s => pillBtn(mealStyle === s.value, () => setMealStyle(s.value), s.label))}
            </div>
          </div>

          {/* Cook: Meal Type */}
          {tab === "cook" && mode === "random" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 8 }}>🍽️ Meal Type</label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                {MEAL_TYPES.map(m => pillBtn(mealType === m.value, () => setMealType(m.value), m.label))}
              </div>
            </div>
          )}

          {/* Pantry */}
          {tab === "cook" && mode === "pantry" && (
            <div style={{ marginBottom: 16 }}>
              <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 8 }}>🧺 What's in your kitchen?</label>
              <div style={{ background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 14px", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", minHeight: 52 }}>
                {pantryItems.map((item, i) => (
                  <span key={item} style={{ background: `${TAG_COLORS[i % TAG_COLORS.length]}22`, border: `1px solid ${TAG_COLORS[i % TAG_COLORS.length]}55`, color: TAG_COLORS[i % TAG_COLORS.length], borderRadius: 999, padding: "4px 12px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                    {item}<span onClick={() => removeItem(item)} style={{ cursor: "pointer", opacity: 0.7, fontSize: 15 }}>×</span>
                  </span>
                ))}
                <input value={pantryInput} onChange={e => setPantryInput(e.target.value)} onKeyDown={addPantryItem} onBlur={addPantryItemOnBlur}
                  placeholder={pantryItems.length === 0 ? "Type ingredient & press Enter..." : "Add more..."}
                  style={{ flex: 1, minWidth: 140, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14 }} />
              </div>
              <p style={{ color: "#6b6590", fontSize: 12, marginTop: 6 }}>Press <strong style={{ color: "#a89ec9" }}>Enter</strong> after each ingredient.</p>
            </div>
          )}

          {error && <p style={{ color: "#ff6b6b", textAlign: "center", marginBottom: 12, fontSize: 14 }}>{error}</p>}

          {/* Action Button */}
          <button onClick={tab === "cook" ? generateRecipe : findRestaurants} disabled={loading} style={{
            width: "100%", padding: "16px", borderRadius: 14, border: "none",
            background: loading ? "#555" : "linear-gradient(90deg, #f7971e, #ffd200)",
            color: loading ? "#999" : "#1a1a2e", fontSize: 16, fontWeight: 800,
            cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 24px rgba(247,151,30,0.4)",
            marginBottom: 24,
          }}>
            {loading ? "✨ Finding the best option..."
              : tab === "eat" ? "🍴 Find Restaurants Near Me"
              : mode === "pantry" ? "🧺 Cook With What I Have"
              : "🍽️ Generate Recipe"}
          </button>

          {/* Recipe Card */}
          {recipe && (
            <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden", animation: "slideInLeft 0.4s ease" }}>
              <div style={{ width: "100%", height: 220, background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
                {imageLoading && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}><div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid rgba(255,210,0,0.2)", borderTopColor: "#ffd200", animation: "spin 0.8s linear infinite" }} /><span style={{ color: "#a89ec9", fontSize: 13 }}>Loading photo...</span></div>}
                {recipeImage && <img src={recipeImage} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setRecipeImage(null)} />}
                {!imageLoading && !recipeImage && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🍽️</div>}
                {recipeImage && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(15,12,41,0.9), transparent)" }} />}
              </div>
              <div style={{ padding: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#fff", flex: 1 }}>{recipe.name}</h2>
                  <button onClick={shareRecipe} style={{ background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.3)", borderRadius: 20, padding: "6px 14px", color: "#ffd200", fontSize: 12, fontWeight: 700, cursor: "pointer", marginLeft: 10, whiteSpace: "nowrap" }}>{shareMsg || "📤 Share"}</button>
                </div>
                <p style={{ color: "#a89ec9", fontSize: 14, margin: "0 0 16px", lineHeight: 1.5 }}>{recipe.description}</p>
                <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
                  {[{ icon: "⏱️", label: `${recipe.time} min` }, { icon: "📊", label: recipe.difficulty }, { icon: "🍽️", label: `Serves ${recipe.servings}` }].map((s, i) => (
                    <div key={i} style={{ background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.2)", borderRadius: 999, padding: "5px 14px", fontSize: 13, color: "#ffd200", fontWeight: 600 }}>{s.icon} {s.label}</div>
                  ))}
                </div>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Ingredients</h3>
                <ul style={{ margin: "0 0 18px", paddingLeft: 20 }}>
                  {recipe.ingredients.map((ing, i) => <li key={i} style={{ color: "#ddd", fontSize: 14, marginBottom: 4 }}>{ing}</li>)}
                </ul>
                <h3 style={{ fontSize: 12, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Instructions</h3>
                {recipe.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 10, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #f7971e, #ffd200)", color: "#1a1a2e", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ color: "#ddd", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{step}</p>
                  </div>
                ))}
                {recipe.tip && <div style={{ background: "rgba(247,151,30,0.08)", border: "1px solid rgba(247,151,30,0.25)", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}><span style={{ fontWeight: 700, color: "#f7971e", fontSize: 13 }}>👨‍🍳 Chef's Tip: </span><span style={{ color: "#ccc", fontSize: 13 }}>{recipe.tip}</span></div>}
                <button onClick={generateRecipe} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "2px solid rgba(255,210,0,0.3)", background: "transparent", color: "#ffd200", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>🍽️ Try Another Recipe</button>
              </div>
            </div>
          )}

          {/* Eat Out Results */}
          {restaurants && (
            <div style={{ animation: "slideInRight 0.4s ease" }}>
              <h2 style={{ fontSize: 18, fontWeight: 800, color: "#ffd200", marginBottom: 16 }}>🍴 {cuisine} Restaurants to Look For</h2>
              {restaurants.map((r, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", padding: 20, marginBottom: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#fff" }}>{r.name}</h3>
                    <span style={{ background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.2)", borderRadius: 999, padding: "3px 10px", fontSize: 12, color: "#ffd200", fontWeight: 700, marginLeft: 10 }}>{r.priceRange}</span>
                  </div>
                  <p style={{ color: "#a89ec9", fontSize: 13, margin: "0 0 12px" }}>{r.vibe}</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 }}>Must Order</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                    {r.mustOrder.map((dish, j) => (
                      <span key={j} style={{ background: "rgba(247,151,30,0.1)", border: "1px solid rgba(247,151,30,0.25)", borderRadius: 999, padding: "4px 12px", fontSize: 12, color: "#f7971e" }}>{dish}</span>
                    ))}
                  </div>
                  <a href={`https://www.google.com/maps/search/${encodeURIComponent(r.searchTip)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.3)", borderRadius: 20, padding: "7px 16px", color: "#ffd200", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>📍 Find on Google Maps</a>
                </div>
              ))}
              <button onClick={findRestaurants} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "2px solid rgba(255,210,0,0.3)", background: "transparent", color: "#ffd200", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>🔄 Find Different Restaurants</button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}