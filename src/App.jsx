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
  { label: "🇸🇦 Saudi Arabian", value: "Saudi Arabian" },
  { label: "🇩🇪 German", value: "German" },
  { label: "🇬🇧 British", value: "British" },
  { label: "🇵🇹 Portuguese", value: "Portuguese" },
  { label: "🇷🇺 Russian", value: "Russian" },
  { label: "🇦🇷 Argentinian", value: "Argentinian" },
  { label: "🇨🇴 Colombian", value: "Colombian" },
  { label: "🇺🇸 American", value: "American" },
  { label: "🇨🇦 Canadian", value: "Canadian" },
  { label: "🇯🇲 Jamaican", value: "Jamaican" },
  { label: "🇨🇺 Cuban", value: "Cuban" },
  { label: "🇪🇹 Ethiopian", value: "Ethiopian" },
  { label: "🇬🇭 Ghanaian", value: "Ghanaian" },
  { label: "🇰🇪 Kenyan", value: "Kenyan" },
  { label: "🇸🇴 Somali", value: "Somali" },
  { label: "🇿🇦 South African", value: "South African" },
  { label: "🇦🇺 Australian", value: "Australian" },
  { label: "🇹🇼 Taiwanese", value: "Taiwanese" },
  { label: "🇪🇬 Egyptian", value: "Egyptian" },
  { label: "🇭🇺 Hungarian", value: "Hungarian" },
  { label: "🇮🇱 Israeli", value: "Israeli" },
  { label: "🇾🇪 Yemeni", value: "Yemeni" },
];

const QUICK_CHIPS = [
  { label: "🍕 Italian", value: "Italian" },
  { label: "🍣 Japanese", value: "Japanese" },
  { label: "🌮 Mexican", value: "Mexican" },
  { label: "🍛 Indian", value: "Indian" },
  { label: "🥩 American", value: "American" },
  { label: "🫕 Mediterranean", value: "Greek" },
  { label: "🍜 Thai", value: "Thai" },
  { label: "🥘 Korean", value: "Korean" },
  { label: "🦞 Seafood", value: "Singaporean" },
  { label: "🥗 Lebanese", value: "Lebanese" },
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
  { label: "🥚 Breakfast", value: "breakfast" },
  { label: "🍰 Dessert", value: "dessert" },
  { label: "🫓 Bread & Pastry", value: "bread or pastry" },
];

const TAG_COLORS = ["#FF7A00","#FFC857","#a78bfa","#34d399","#60a5fa","#f472b6"];

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&q=80",
  "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=800&q=80",
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=800&q=80",
];

function PremiumDropdown({ label, icon, value, onChange, options, placeholder }) {
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
      <button onClick={() => setOpen(!open)} style={{
        width: "100%", padding: "14px 16px", borderRadius: 14,
        border: "1px solid " + (value ? "rgba(255,122,0,0.5)" : "rgba(255,255,255,0.08)"),
        background: value ? "rgba(255,122,0,0.08)" : "rgba(255,255,255,0.04)",
        color: value ? "#FF7A00" : "#666", fontSize: 14,
        cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center",
        backdropFilter: "blur(10px)", transition: "all 0.2s",
      }}>
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 16 }}>{icon}</span>
          <span style={{ fontWeight: value ? 600 : 400 }}>{selected ? selected.label : placeholder}</span>
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", opacity: 0.5 }}>
          <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 300,
          background: "#1A1A22", border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: 14, overflow: "hidden",
          boxShadow: "0 20px 60px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05)",
          maxHeight: 280, overflowY: "auto",
        }}>
          {options.map((o, i) => (
            <button key={o.value} onClick={() => { onChange(o.value); setOpen(false); }} style={{
              width: "100%", padding: "12px 16px",
              background: value === o.value ? "rgba(255,122,0,0.12)" : i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.01)",
              border: "none", borderBottom: i < options.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              color: value === o.value ? "#FF7A00" : "#ccc", fontSize: 13,
              cursor: "pointer", textAlign: "left", fontWeight: value === o.value ? 700 : 400,
              transition: "background 0.15s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,122,0,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = value === o.value ? "rgba(255,122,0,0.12)" : "transparent"}
            >{o.label}</button>
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
  const handleInput = (val) => {
    setInput(val);
    if (!val.trim()) { setSuggestions([]); setOpen(false); setCuisine(""); return; }
    const filtered = ALL_CUISINES.filter(c => c.label.toLowerCase().includes(val.toLowerCase()) || c.value.toLowerCase().includes(val.toLowerCase())).slice(0, 7);
    setSuggestions(filtered);
    setOpen(true);
    setCuisine(val);
  };
  const select = (c) => { setInput(c.label); setCuisine(c.value); setSuggestions([]); setOpen(false); };
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 10,
        border: "1px solid " + (focused ? "rgba(255,122,0,0.6)" : cuisine ? "rgba(255,122,0,0.4)" : "rgba(255,255,255,0.08)"),
        borderRadius: 14, background: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(10px)", transition: "all 0.2s",
        boxShadow: focused ? "0 0 0 3px rgba(255,122,0,0.12)" : "none",
        padding: "14px 16px",
      }}>
        <span style={{ fontSize: 16 }}>🌍</span>
        <input value={input} onChange={e => handleInput(e.target.value)}
          onFocus={() => { setFocused(true); if (suggestions.length > 0) setOpen(true); }}
          placeholder="Search country or cuisine…"
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: cuisine ? "#FF7A00" : "#fff", fontSize: 14, fontWeight: cuisine ? 600 : 400 }} />
        {input && <button onClick={() => { setInput(""); setCuisine(""); setSuggestions([]); setOpen(false); }} style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#888", fontSize: 14, cursor: "pointer", width: 22, height: 22, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>×</button>}
      </div>
      {open && suggestions.length > 0 && (
        <div style={{ position: "absolute", top: "calc(100% + 8px)", left: 0, right: 0, zIndex: 300, background: "#1A1A22", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.8)" }}>
          {suggestions.map((c, i) => (
            <button key={c.value} onClick={() => select(c)} style={{
              width: "100%", padding: "11px 16px", background: "transparent",
              border: "none", borderBottom: i < suggestions.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none",
              color: "#ddd", fontSize: 13, cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 10,
            }}
            onMouseEnter={e => e.currentTarget.style.background = "rgba(255,122,0,0.08)"}
            onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              <span style={{ fontSize: 20 }}>{c.label.split(" ")[0]}</span>
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
  const [dishImages, setDishImages] = useState({});
  const [recipeImage, setRecipeImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [shareMsg, setShareMsg] = useState("");
  const [heroImg] = useState(() => HERO_IMAGES[Math.floor(Math.random() * HERO_IMAGES.length)]);
  const [btnHover, setBtnHover] = useState(false);

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

  const fetchFoodImage = async (query) => {
    // Use Wikimedia Commons REST API - returns images that actually match the search
    try {
      const url = "https://en.wikipedia.org/w/api.php?action=query&titles=" +
        encodeURIComponent(query) + "&prop=pageimages&pithumbsize=800&format=json&origin=*";
      const res = await fetch(url);
      const data = await res.json();
      const pages = data.query?.pages;
      if (pages) {
        const page = Object.values(pages)[0];
        if (page?.thumbnail?.source) return page.thumbnail.source;
      }
    } catch(e) {}
    return null;
  };

  const fetchImage = async (recipeName, cuisineName) => {
    setImageLoading(true); setRecipeImage(null);
    try {
      // Try exact recipe Wikipedia page first
      let img = await fetchFoodImage(recipeName);
      if (img) { setRecipeImage(img); setImageLoading(false); return; }

      // Try recipe name + cuisine
      img = await fetchFoodImage(recipeName + " " + cuisineName + " dish");
      if (img) { setRecipeImage(img); setImageLoading(false); return; }

      // Try just the dish name
      img = await fetchFoodImage(recipeName + " dish");
      if (img) { setRecipeImage(img); setImageLoading(false); return; }

      // Fallback: search in files namespace
      const wikiRes = await fetch("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
        encodeURIComponent(recipeName) + "&gsrnamespace=6&gsrlimit=15&prop=imageinfo&iiprop=url|mime&format=json&origin=*");
      const pages2 = (await wikiRes.json()).query?.pages;
      if (pages2) {
        for (const page of Object.values(pages2)) {
          const info = page.imageinfo?.[0];
          const title = (page.title || "").toLowerCase();
          if (info?.mime?.startsWith("image/") && /\.(jpg|jpeg|png|webp)/i.test(info.url)
            && !info.url.includes("Flag") && !info.url.includes("Map") && !info.url.includes("Logo")
            && !info.url.includes("icon") && !title.includes("map") && !title.includes("flag")) {
            setRecipeImage(info.url); setImageLoading(false); return;
          }
        }
      }
    } catch (e) {}
    setImageLoading(false);
  };

  const fetchDishImage = async (dishName) => {
    try {
      const img = await fetchFoodImage(dishName);
      if (img) return img;
      // fallback search
      const res = await fetch("https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
        encodeURIComponent(dishName + " food") + "&gsrnamespace=6&gsrlimit=8&prop=imageinfo&iiprop=url|mime&format=json&origin=*");
      const pages = (await res.json()).query?.pages;
      if (pages) {
        for (const page of Object.values(pages)) {
          const info = page.imageinfo?.[0];
          if (info?.mime?.startsWith("image/") && /\.(jpg|jpeg|png|webp)/i.test(info.url)
            && !info.url.includes("Flag") && !info.url.includes("Map") && !info.url.includes("Logo")) {
            return info.url;
          }
        }
      }
    } catch(e) {}
    return null;
  };

  const getLocation = () => new Promise((res, rej) => { if (!navigator.geolocation) rej(); else navigator.geolocation.getCurrentPosition(res, rej); });

  const generateRecipe = async () => {
    if (!cuisine) { setError("Search for a cuisine first"); return; }
    if (mode === "random" && !mealType) { setError("Pick a meal type"); return; }
    if (mode === "pantry" && pantryItems.length === 0) { setError("Add at least one ingredient"); return; }
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
    if (!cuisine) { setError("Search for a cuisine first"); return; }
    setError(""); setLoading(true); setRestaurants(null);
    try {
      let locationText = "The user's location is unknown.";
      try { const pos = await getLocation(); locationText = `User is at lat ${pos.coords.latitude}, lng ${pos.coords.longitude}.`; } catch(e) {}
      const styleText = mealStyle ? ` The user prefers ${mealStyle} food.` : "";
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1000, messages: [{ role: "user", content: `${locationText}${styleText} The user wants ${cuisine} food. Suggest 3 types of ${cuisine} restaurants and 4-5 must-order dishes each. Respond ONLY with JSON: {"restaurants":[{"name":"Type name","vibe":"Atmosphere","mustOrder":["Dish 1","Dish 2","Dish 3","Dish 4"],"priceRange":"$$","searchTip":"Google Maps search term"}]}` }] })
      });
      const data = await res.json();
      const parsed = JSON.parse(data.content.map(i => i.text || "").join("").replace(/```json|```/g, "").trim());
      setRestaurants(parsed.restaurants);
      // Fetch images for each must-order dish in background
      const imgs = {};
      for (const restaurant of parsed.restaurants) {
        for (const dish of restaurant.mustOrder) {
          const key = dish;
          if (!imgs[key]) {
            const img = await fetchDishImage(dish);
            if (img) imgs[key] = img;
          }
        }
      }
      setDishImages(imgs);
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

  const reset = () => { setRecipe(null); setRestaurants(null); setRecipeImage(null); setDishImages({}); setError(""); };

  return (
    <div style={{ minHeight: "100vh", background: "#0B0B0F", fontFamily: "'Inter', 'SF Pro Display', -apple-system, system-ui, sans-serif", color: "#fff", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes shimmer { from { background-position: -200% 0; } to { background-position: 200% 0; } }
        @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.5; } }
        @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(255,122,0,0.3); } 50% { box-shadow: 0 0 40px rgba(255,122,0,0.6); } }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 0; height: 0; }
        input::placeholder { color: #444; }
        a { text-decoration: none; }
      `}</style>

      {/* HERO */}
      <div style={{ position: "relative", height: 420, overflow: "hidden" }}>
        <img src={heroImg} alt="Food" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.35)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(11,11,15,0.2) 0%, rgba(11,11,15,0.6) 60%, #0B0B0F 100%)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 20px 32px" }}>
          <div style={{ animation: "fadeUp 0.6s ease" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,122,0,0.15)", border: "1px solid rgba(255,122,0,0.3)", borderRadius: 20, padding: "4px 12px", marginBottom: 12 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF7A00", animation: "pulse 2s infinite", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: "#FF7A00", letterSpacing: 1, textTransform: "uppercase" }}>AI-Powered Discovery</span>
            </div>
            <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.15, marginBottom: 10, letterSpacing: "-0.5px" }}>
              What Should I<br /><span style={{ background: "linear-gradient(90deg, #FF7A00, #FFC857)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Cook Tonight?</span>
            </h1>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>Discover amazing recipes tailored to your cravings.</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ padding: "0 16px 100px", maxWidth: 600, margin: "0 auto" }}>

        {/* Cook / Eat Out Toggle */}
        <div style={{ marginTop: -20, marginBottom: 24, animation: "fadeUp 0.5s ease 0.1s both" }}>
          <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 18, padding: 4, border: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
            <div style={{
              position: "absolute", top: 4, bottom: 4,
              left: tab === "cook" ? 4 : "calc(50% + 2px)",
              width: "calc(50% - 6px)",
              background: "linear-gradient(135deg, #FF7A00, #FFC857)",
              borderRadius: 14, transition: "left 0.35s cubic-bezier(0.4,0,0.2,1)",
              boxShadow: "0 4px 20px rgba(255,122,0,0.4)",
            }} />
            {[["cook","👨‍🍳 Cook"],["eat","🍴 Eat Out"]].map(([val, lbl]) => (
              <button key={val} onClick={() => { setTab(val); reset(); }} style={{
                flex: 1, padding: "13px 0", border: "none", background: "transparent",
                color: tab === val ? "#0B0B0F" : "rgba(255,255,255,0.4)",
                fontSize: 14, fontWeight: tab === val ? 800 : 500, cursor: "pointer",
                position: "relative", zIndex: 1, borderRadius: 14, transition: "color 0.3s",
                letterSpacing: "0.2px",
              }}>{lbl}</button>
            ))}
          </div>
        </div>

        {/* Quick Cuisine Chips */}
        <div style={{ marginBottom: 20, animation: "fadeUp 0.5s ease 0.15s both" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>Quick Pick</p>
          <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4 }}>
            {QUICK_CHIPS.map(c => {
              const active = cuisine === c.value;
              return (
                <button key={c.value} onClick={() => { setCuisine(c.value); reset(); }} style={{
                  flexShrink: 0, padding: "8px 14px", borderRadius: 20,
                  border: "1px solid " + (active ? "rgba(255,122,0,0.8)" : "rgba(255,255,255,0.08)"),
                  background: active ? "rgba(255,122,0,0.15)" : "rgba(255,255,255,0.04)",
                  color: active ? "#FF7A00" : "rgba(255,255,255,0.6)",
                  fontSize: 12, fontWeight: active ? 700 : 400, cursor: "pointer",
                  boxShadow: active ? "0 0 16px rgba(255,122,0,0.25)" : "none",
                  transition: "all 0.2s", whiteSpace: "nowrap",
                }}>{c.label}</button>
              );
            })}
          </div>
        </div>

        {/* Sub Mode (Cook only) */}
        {tab === "cook" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20, animation: "fadeUp 0.5s ease 0.2s both" }}>
            {[
              { val: "random", icon: "🎲", title: "Surprise Me", desc: "Get a random recipe" },
              { val: "pantry", icon: "🧺", title: "My Ingredients", desc: "Cook what you have" },
            ].map(item => (
              <button key={item.val} onClick={() => { setMode(item.val); reset(); }} style={{
                padding: "16px", borderRadius: 16, border: "1px solid " + (mode === item.val ? "rgba(255,122,0,0.5)" : "rgba(255,255,255,0.06)"),
                background: mode === item.val ? "rgba(255,122,0,0.1)" : "rgba(255,255,255,0.03)",
                cursor: "pointer", textAlign: "left", transition: "all 0.2s",
                boxShadow: mode === item.val ? "0 0 24px rgba(255,122,0,0.15)" : "none",
              }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>{item.icon}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: mode === item.val ? "#FF7A00" : "#fff", marginBottom: 2 }}>{item.title}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)" }}>{item.desc}</div>
              </button>
            ))}
          </div>
        )}

        {/* Inputs Section */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20, animation: "fadeUp 0.5s ease 0.25s both" }}>
          <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 2 }}>Customize</p>

          <CuisineSearch cuisine={cuisine} setCuisine={(v) => { setCuisine(v); reset(); }} />

          <PremiumDropdown label="Meal Style" icon="🥗" value={mealStyle} onChange={setMealStyle} options={MEAL_STYLES} placeholder="Any dietary style…" />

          {tab === "cook" && mode === "random" && (
            <PremiumDropdown label="Meal Type" icon="🍽️" value={mealType} onChange={setMealType} options={MEAL_TYPES} placeholder="What type of dish?…" />
          )}

          {tab === "cook" && mode === "pantry" && (
            <div style={{ padding: "14px 16px", borderRadius: 14, border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 10 }}>🧺 Your Ingredients</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: pantryItems.length > 0 ? 10 : 0 }}>
                {pantryItems.map((item, i) => (
                  <span key={item} style={{ background: `${TAG_COLORS[i % TAG_COLORS.length]}18`, border: `1px solid ${TAG_COLORS[i % TAG_COLORS.length]}40`, color: TAG_COLORS[i % TAG_COLORS.length], borderRadius: 20, padding: "4px 12px", fontSize: 12, fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>
                    {item}<span onClick={() => removeItem(item)} style={{ cursor: "pointer", opacity: 0.6, fontSize: 14, lineHeight: 1 }}>×</span>
                  </span>
                ))}
              </div>
              <input value={pantryInput} onChange={e => setPantryInput(e.target.value)} onKeyDown={addPantryItem} onBlur={addPantryItemOnBlur}
                placeholder="Add ingredients, press Enter…"
                style={{ width: "100%", background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14 }} />
            </div>
          )}
        </div>

        {error && (
          <div style={{ background: "rgba(255,80,80,0.08)", border: "1px solid rgba(255,80,80,0.25)", borderRadius: 10, padding: "10px 14px", marginBottom: 14, fontSize: 13, color: "#ff6b6b", animation: "fadeUp 0.3s ease" }}>
            ⚠️ {error}
          </div>
        )}

        {/* CTA Button */}
        <button
          onClick={tab === "cook" ? generateRecipe : findRestaurants}
          disabled={loading}
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            width: "100%", padding: "17px", borderRadius: 16, border: "none",
            background: loading ? "#1A1A22" : "linear-gradient(135deg, #FF7A00 0%, #FFC857 100%)",
            color: loading ? "#444" : "#0B0B0F",
            fontSize: 15, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
            boxShadow: loading ? "none" : btnHover ? "0 8px 40px rgba(255,122,0,0.6)" : "0 4px 24px rgba(255,122,0,0.35)",
            transition: "all 0.25s cubic-bezier(0.4,0,0.2,1)",
            transform: btnHover && !loading ? "translateY(-1px)" : "none",
            letterSpacing: "0.3px", marginBottom: 28,
          }}>
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid #333", borderTopColor: "#666", animation: "spin 0.8s linear infinite", display: "inline-block" }} />
              Finding the perfect option…
            </span>
          ) : tab === "eat" ? "🍴 Find Restaurants Near Me"
            : mode === "pantry" ? "🧺 Cook With What I Have"
            : "✨ Generate My Recipe"}
        </button>

        {/* Recipe Result */}
        {recipe && (
          <div style={{ animation: "fadeUp 0.5s ease", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", background: "#121218", boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}>
            {/* Image */}
            <div style={{ position: "relative", height: 260, background: "#1A1A22" }}>
              {imageLoading && (
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, #1A1A22 25%, #242430 50%, #1A1A22 75%)", backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite" }} />
              )}
              {recipeImage && <img src={recipeImage} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setRecipeImage(null)} />}
              {!imageLoading && !recipeImage && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64, background: "#1A1A22" }}>🍽️</div>}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, #121218 100%)" }} />
              {/* Share button */}
              <button onClick={shareRecipe} style={{
                position: "absolute", top: 14, right: 14,
                background: "rgba(0,0,0,0.6)", backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.12)", borderRadius: 20,
                padding: "7px 14px", color: "#fff", fontSize: 12, fontWeight: 600, cursor: "pointer",
              }}>{shareMsg || "📤 Share"}</button>
            </div>

            <div style={{ padding: "20px 20px 24px" }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.3px" }}>{recipe.name}</h2>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 16, lineHeight: 1.6 }}>{recipe.description}</p>

              <div style={{ display: "flex", gap: 8, marginBottom: 22, flexWrap: "wrap" }}>
                {[{ icon: "⏱", label: `${recipe.time} min` }, { icon: "📊", label: recipe.difficulty }, { icon: "👥", label: `${recipe.servings} servings` }].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,122,0,0.08)", border: "1px solid rgba(255,122,0,0.2)", borderRadius: 20, padding: "5px 12px", fontSize: 12, color: "#FFC857", fontWeight: 600, display: "flex", alignItems: "center", gap: 5 }}>{s.icon} {s.label}</div>
                ))}
              </div>

              <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 14, padding: "16px", marginBottom: 16 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,122,0,0.8)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Ingredients</p>
                {recipe.ingredients.map((ing, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", borderBottom: i < recipe.ingredients.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
                    <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#FF7A00", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>{ing}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,122,0,0.8)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>Instructions</p>
                {recipe.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                    <div style={{ minWidth: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #FF7A00, #FFC857)", color: "#0B0B0F", fontWeight: 800, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.65, paddingTop: 4 }}>{step}</p>
                  </div>
                ))}
              </div>

              {recipe.tip && (
                <div style={{ background: "linear-gradient(135deg, rgba(255,122,0,0.08), rgba(255,200,87,0.06))", border: "1px solid rgba(255,122,0,0.2)", borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
                  <span style={{ fontWeight: 700, color: "#FF7A00", fontSize: 12 }}>👨‍🍳 Chef's Tip  </span>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", lineHeight: 1.6 }}>{recipe.tip}</span>
                </div>
              )}

              <button onClick={generateRecipe} style={{
                width: "100%", padding: "13px", borderRadius: 12,
                border: "1px solid rgba(255,122,0,0.25)", background: "transparent",
                color: "#FF7A00", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,122,0,0.08)"; e.currentTarget.style.borderColor = "rgba(255,122,0,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,122,0,0.25)"; }}
              >🔄 Generate Another Recipe</button>
            </div>
          </div>
        )}

        {/* Eat Out Results */}
        {restaurants && (
          <div style={{ animation: "fadeUp 0.5s ease" }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 16 }}>🍴 {cuisine} Restaurants Near You</p>
            {restaurants.map((r, i) => (
              <div key={i} style={{ background: "#121218", borderRadius: 20, border: "1px solid rgba(255,255,255,0.06)", marginBottom: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.4)", overflow: "hidden" }}>
                {/* Restaurant Header */}
                <div style={{ padding: "18px 18px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 5 }}>
                    <h3 style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{r.name}</h3>
                    <span style={{ background: "rgba(255,200,87,0.1)", border: "1px solid rgba(255,200,87,0.25)", borderRadius: 20, padding: "3px 10px", fontSize: 11, color: "#FFC857", fontWeight: 700, marginLeft: 8, flexShrink: 0 }}>{r.priceRange}</span>
                  </div>
                  <p style={{ fontSize: 12, color: "rgba(255,255,255,0.35)", lineHeight: 1.5, marginBottom: 0 }}>{r.vibe}</p>
                </div>

                {/* Divider */}
                <div style={{ height: 1, background: "rgba(255,255,255,0.04)", margin: "0 18px" }} />

                {/* Must Order Menu with Photos */}
                <div style={{ padding: "14px 18px 16px" }}>
                  <p style={{ fontSize: 10, fontWeight: 700, color: "rgba(255,122,0,0.8)", textTransform: "uppercase", letterSpacing: 1.5, marginBottom: 12 }}>📋 Must Order</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {r.mustOrder.map((dish, j) => (
                      <div key={j} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        background: "rgba(255,255,255,0.03)", borderRadius: 12,
                        border: "1px solid rgba(255,255,255,0.05)", overflow: "hidden",
                      }}>
                        {/* Dish photo */}
                        <div style={{ width: 70, height: 70, flexShrink: 0, background: "#1A1A22", position: "relative", overflow: "hidden" }}>
                          {dishImages[dish] ? (
                            <img src={dishImages[dish]} alt={dish}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              onError={e => { e.currentTarget.style.display = "none"; }}
                            />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
                              background: "linear-gradient(90deg, #1A1A22 25%, #242430 50%, #1A1A22 75%)",
                              backgroundSize: "200% 100%", animation: "shimmer 1.5s infinite",
                              fontSize: 24 }}>
                              {Object.keys(dishImages).length === 0 ? "🍽️" : ""}
                            </div>
                          )}
                        </div>
                        {/* Dish name */}
                        <div style={{ flex: 1, padding: "0 12px 0 0" }}>
                          <p style={{ fontSize: 13, fontWeight: 600, color: "#fff", marginBottom: 2 }}>{dish}</p>
                          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{r.name}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Find Button */}
                <div style={{ padding: "0 18px 18px" }}>
                  <a href={`https://www.google.com/maps/search/${encodeURIComponent(r.searchTip)}`} target="_blank" rel="noopener noreferrer" style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    background: "linear-gradient(135deg, rgba(255,122,0,0.15), rgba(255,200,87,0.1))",
                    border: "1px solid rgba(255,122,0,0.3)", borderRadius: 12,
                    padding: "11px", color: "#FF7A00", fontSize: 13, fontWeight: 700, width: "100%",
                  }}>📍 Find on Google Maps</a>
                </div>
              </div>
            ))}
            <button onClick={findRestaurants} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid rgba(255,122,0,0.25)", background: "transparent", color: "#FF7A00", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>
              🔄 Find Different Restaurants
            </button>
          </div>
        )}
      </div>
    </div>
  );
}