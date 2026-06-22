import { useState, useRef, useEffect } from "react";

const CONTINENTS = [
  {
    name: "🌍 Africa",
    regions: [
      {
        name: "North Africa",
        cuisines: [
          { label: "🇲🇦 Moroccan", value: "Moroccan" },
          { label: "🇪🇬 Egyptian", value: "Egyptian" },
          { label: "🇹🇳 Tunisian", value: "Tunisian" },
        ],
      },
      {
        name: "West Africa",
        cuisines: [
          { label: "🇳🇬 Nigerian", value: "Nigerian" },
          { label: "🇬🇭 Ghanaian", value: "Ghanaian" },
          { label: "🇸🇳 Senegalese", value: "Senegalese" },
        ],
      },
      {
        name: "East Africa",
        cuisines: [
          { label: "🇪🇹 Ethiopian", value: "Ethiopian" },
          { label: "🇰🇪 Kenyan", value: "Kenyan" },
          { label: "🇸🇴 Somali", value: "Somali" },
        ],
      },
    ],
  },
  {
    name: "🌏 Asia",
    regions: [
      {
        name: "Southeast Asia",
        cuisines: [
          { label: "🇲🇾 Malaysian", value: "Malaysian" },
          { label: "🇵🇭 Filipino", value: "Filipino" },
          { label: "🇮🇩 Indonesian", value: "Indonesian" },
          { label: "🇸🇬 Singaporean", value: "Singaporean" },
          { label: "🇹🇭 Thai", value: "Thai" },
          { label: "🇻🇳 Vietnamese", value: "Vietnamese" },
        ],
      },
      {
        name: "East Asia",
        cuisines: [
          { label: "🇯🇵 Japanese", value: "Japanese" },
          { label: "🇨🇳 Chinese", value: "Chinese" },
          { label: "🇰🇷 Korean", value: "Korean" },
          { label: "🇹🇼 Taiwanese", value: "Taiwanese" },
        ],
      },
      {
        name: "South Asia",
        cuisines: [
          { label: "🇮🇳 Indian", value: "Indian" },
          { label: "🇵🇰 Pakistani", value: "Pakistani" },
          { label: "🇱🇰 Sri Lankan", value: "Sri Lankan" },
          { label: "🇧🇩 Bangladeshi", value: "Bangladeshi" },
        ],
      },
      {
        name: "Middle East",
        cuisines: [
          { label: "🇱🇧 Lebanese", value: "Lebanese" },
          { label: "🇹🇷 Turkish", value: "Turkish" },
          { label: "🇮🇷 Persian", value: "Persian" },
          { label: "🇸🇦 Saudi Arabian", value: "Saudi Arabian" },
          { label: "🇮🇱 Israeli", value: "Israeli" },
        ],
      },
    ],
  },
  {
    name: "🌍 Europe",
    regions: [
      {
        name: "Mediterranean",
        cuisines: [
          { label: "🇮🇹 Italian", value: "Italian" },
          { label: "🇬🇷 Greek", value: "Greek" },
          { label: "🇪🇸 Spanish", value: "Spanish" },
          { label: "🇵🇹 Portuguese", value: "Portuguese" },
        ],
      },
      {
        name: "Western Europe",
        cuisines: [
          { label: "🇫🇷 French", value: "French" },
          { label: "🇩🇪 German", value: "German" },
          { label: "🇬🇧 British", value: "British" },
          { label: "🇧🇪 Belgian", value: "Belgian" },
        ],
      },
      {
        name: "Eastern Europe",
        cuisines: [
          { label: "🇷🇺 Russian", value: "Russian" },
          { label: "🇵🇱 Polish", value: "Polish" },
          { label: "🇺🇦 Ukrainian", value: "Ukrainian" },
          { label: "🇷🇴 Romanian", value: "Romanian" },
        ],
      },
    ],
  },
  {
    name: "🌎 Americas",
    regions: [
      {
        name: "Latin America",
        cuisines: [
          { label: "🇲🇽 Mexican", value: "Mexican" },
          { label: "🇧🇷 Brazilian", value: "Brazilian" },
          { label: "🇵🇪 Peruvian", value: "Peruvian" },
          { label: "🇦🇷 Argentinian", value: "Argentinian" },
          { label: "🇨🇴 Colombian", value: "Colombian" },
        ],
      },
      {
        name: "North America",
        cuisines: [
          { label: "🇺🇸 American", value: "American" },
          { label: "🇨🇦 Canadian", value: "Canadian" },
        ],
      },
      {
        name: "Caribbean",
        cuisines: [
          { label: "🇯🇲 Jamaican", value: "Jamaican" },
          { label: "🇨🇺 Cuban", value: "Cuban" },
          { label: "🇹🇹 Trinidadian", value: "Trinidadian" },
        ],
      },
    ],
  },
  {
    name: "🌏 Oceania",
    regions: [
      {
        name: "Pacific",
        cuisines: [
          { label: "🇦🇺 Australian", value: "Australian" },
          { label: "🇳🇿 New Zealand", value: "New Zealand" },
          { label: "🇫🇯 Fijian", value: "Fijian" },
        ],
      },
    ],
  },
];

const ALL_CUISINES = CONTINENTS.flatMap(c => c.regions.flatMap(r => r.cuisines));

const MEAL_TYPES = [
  { label: "🍜 Noodles & Pasta", value: "noodles or pasta" },
  { label: "🥘 Stew & Curry", value: "stew or curry" },
  { label: "🥗 Salad", value: "salad" },
  { label: "🍲 Soup", value: "soup" },
  { label: "🔥 Grilled", value: "grilled dish" },
  { label: "🥩 Meat", value: "meat dish" },
  { label: "🐟 Seafood", value: "seafood dish" },
  { label: "🌱 Vegetarian", value: "vegetarian dish" },
  { label: "🥚 Breakfast", value: "breakfast" },
  { label: "🍰 Dessert", value: "dessert" },
  { label: "🫓 Bread & Pastry", value: "bread or pastry" },
  { label: "🎲 Surprise Me!", value: "any type of dish" },
];

const TAG_COLORS = ["#ffd200","#f7971e","#a78bfa","#34d399","#60a5fa","#f472b6","#fb923c"];

// Cuisine Dropdown Component
function CuisineDropdown({ cuisine, setCuisine }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openContinent, setOpenContinent] = useState(null);
  const [openRegion, setOpenRegion] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = search.trim()
    ? ALL_CUISINES.filter(c => c.label.toLowerCase().includes(search.toLowerCase()) || c.value.toLowerCase().includes(search.toLowerCase()))
    : null;

  const selected = ALL_CUISINES.find(c => c.value === cuisine);

  return (
    <div ref={ref} style={{ position: "relative", marginBottom: 20 }}>
      <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
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
          maxHeight: 400, overflowY: "auto",
        }}>
          {/* Search */}
          <div style={{ padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,0.08)", position: "sticky", top: 0, background: "#1a1535" }}>
            <input
              autoFocus
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="🔍 Search cuisine..."
              style={{
                width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.15)",
                borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 13, outline: "none", boxSizing: "border-box",
              }}
            />
          </div>

          {/* Search results */}
          {filtered ? (
            <div style={{ padding: "6px 0" }}>
              {filtered.length === 0 ? (
                <div style={{ padding: "12px 16px", color: "#888", fontSize: 13 }}>No results found</div>
              ) : filtered.map(c => (
                <button key={c.value} onClick={() => { setCuisine(c.value); setOpen(false); setSearch(""); }} style={{
                  width: "100%", padding: "9px 16px", background: cuisine === c.value ? "rgba(255,210,0,0.1)" : "transparent",
                  border: "none", color: cuisine === c.value ? "#ffd200" : "#ddd", fontSize: 13,
                  cursor: "pointer", textAlign: "left", display: "block",
                }}>
                  {c.label}
                </button>
              ))}
            </div>
          ) : (
            /* Continent > Region > Cuisine tree */
            CONTINENTS.map(continent => (
              <div key={continent.name}>
                <button onClick={() => setOpenContinent(openContinent === continent.name ? null : continent.name)} style={{
                  width: "100%", padding: "10px 14px", background: "rgba(255,255,255,0.04)",
                  border: "none", borderBottom: "1px solid rgba(255,255,255,0.06)",
                  color: "#ffd200", fontSize: 13, fontWeight: 700, cursor: "pointer", textAlign: "left",
                  display: "flex", justifyContent: "space-between",
                }}>
                  {continent.name} <span style={{ opacity: 0.6, fontSize: 10 }}>{openContinent === continent.name ? "▲" : "▼"}</span>
                </button>
                {openContinent === continent.name && continent.regions.map(region => (
                  <div key={region.name}>
                    <button onClick={() => setOpenRegion(openRegion === region.name ? null : region.name)} style={{
                      width: "100%", padding: "8px 24px", background: "rgba(255,255,255,0.02)",
                      border: "none", borderBottom: "1px solid rgba(255,255,255,0.04)",
                      color: "#f7971e", fontSize: 12, fontWeight: 600, cursor: "pointer", textAlign: "left",
                      display: "flex", justifyContent: "space-between",
                    }}>
                      {region.name} <span style={{ opacity: 0.6, fontSize: 10 }}>{openRegion === region.name ? "▲" : "▼"}</span>
                    </button>
                    {openRegion === region.name && region.cuisines.map(c => (
                      <button key={c.value} onClick={() => { setCuisine(c.value); setOpen(false); setSearch(""); }} style={{
                        width: "100%", padding: "8px 36px", background: cuisine === c.value ? "rgba(255,210,0,0.1)" : "transparent",
                        border: "none", color: cuisine === c.value ? "#ffd200" : "#ccc",
                        fontSize: 13, cursor: "pointer", textAlign: "left", display: "block",
                      }}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("cook"); // "cook" | "eat"
  const [mode, setMode] = useState("random");
  const [cuisine, setCuisine] = useState("");
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
  const [location, setLocation] = useState(null);

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
    setImageLoading(true);
    setRecipeImage(null);
    try {
      const searchQuery = encodeURIComponent(recipeName + " food");
      const wikiRes = await fetch(
        "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
        searchQuery + "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&format=json&origin=*"
      );
      const wikiData = await wikiRes.json();
      const pages = wikiData.query?.pages;
      if (pages) {
        for (const page of Object.values(pages)) {
          const info = page.imageinfo?.[0];
          if (info && info.mime?.startsWith("image/") && info.url &&
            /\.(jpg|jpeg|png|webp)/i.test(info.url) &&
            !info.url.includes("Flag") && !info.url.includes("Map") && !info.url.includes("Logo")) {
            setRecipeImage(info.url);
            setImageLoading(false);
            return;
          }
        }
      }
      const fallbackRes = await fetch(
        "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
        encodeURIComponent(cuisineName + " cuisine dish") +
        "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&format=json&origin=*"
      );
      const fallbackData = await fallbackRes.json();
      const fp = fallbackData.query?.pages;
      if (fp) {
        for (const page of Object.values(fp)) {
          const info = page.imageinfo?.[0];
          if (info && info.mime?.startsWith("image/") && info.url && /\.(jpg|jpeg|png|webp)/i.test(info.url) && !info.url.includes("Flag") && !info.url.includes("Map")) {
            setRecipeImage(info.url);
            setImageLoading(false);
            return;
          }
        }
      }
    } catch (e) {}
    setImageLoading(false);
  };

  const getLocation = () => new Promise((resolve, reject) => {
    if (!navigator.geolocation) reject("Geolocation not supported");
    else navigator.geolocation.getCurrentPosition(resolve, reject);
  });

  const generateRecipe = async () => {
    if (!cuisine) { setError("Pick a cuisine first!"); return; }
    if (mode === "random" && !mealType) { setError("Pick a meal type!"); return; }
    if (mode === "pantry" && pantryItems.length === 0) { setError("Add at least one ingredient!"); return; }
    setError(""); setLoading(true); setRecipe(null); setRecipeImage(null);

    const prompt = mode === "random"
      ? `Generate a random authentic ${cuisine} ${mealType} recipe.`
      : `Generate an authentic ${cuisine} recipe using ONLY or mostly these ingredients I have at home: ${pantryItems.join(", ")}. You can assume basic pantry staples like salt, pepper, oil, garlic, onion are available.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: `${prompt} Respond ONLY with a JSON object, no markdown, no backticks. Structure: {"name":"Recipe Name","description":"One sentence","time":30,"difficulty":"Easy","servings":4,"ingredients":["item with qty"],"steps":["Step 1"],"tip":"Chef tip"}` }]
        })
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setRecipe(parsed);
      fetchImage(parsed.name, cuisine);
    } catch (err) { setError("Something went wrong. Try again!"); }
    setLoading(false);
  };

  const findRestaurants = async () => {
    if (!cuisine) { setError("Pick a cuisine first!"); return; }
    setError(""); setLoading(true); setRestaurants(null);
    try {
      let pos;
      try { pos = await getLocation(); } catch(e) { pos = null; }
      const locationText = pos
        ? `The user is at latitude ${pos.coords.latitude}, longitude ${pos.coords.longitude}.`
        : "The user's location is unknown, so suggest they search locally.";

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{ role: "user", content: `${locationText} The user wants to eat ${cuisine} food. Suggest 3 well-known types of ${cuisine} restaurants they should look for, and list 4-5 must-order dishes at each. Respond ONLY with JSON, no markdown: {"restaurants":[{"name":"Restaurant type name","vibe":"One sentence atmosphere description","mustOrder":["Dish 1","Dish 2","Dish 3","Dish 4"],"priceRange":"$ or $$ or $$$ or $$$$","searchTip":"What to search on Google Maps to find this"}]}` }]
        })
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("");
      const parsed = JSON.parse(text.replace(/```json|```/g, "").trim());
      setRestaurants(parsed.restaurants);
    } catch (err) { setError("Something went wrong. Try again!"); }
    setLoading(false);
  };

  const shareRecipe = async () => {
    if (!recipe) return;
    const text = `🍽️ ${recipe.name}\n\n${recipe.description}\n\n⏱️ ${recipe.time} min | 📊 ${recipe.difficulty} | Serves ${recipe.servings}\n\n🛒 Ingredients:\n${recipe.ingredients.map(i => "• " + i).join("\n")}\n\nGenerated by What Should I Cook?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: recipe.name, text });
      } else {
        await navigator.clipboard.writeText(text);
        setShareMsg("Copied to clipboard!");
        setTimeout(() => setShareMsg(""), 3000);
      }
    } catch (e) {}
  };

  const mainTabStyle = (active) => ({
    flex: 1, padding: "14px 0", border: "none",
    background: active ? "linear-gradient(90deg, #f7971e, #ffd200)" : "transparent",
    color: active ? "#1a1a2e" : "#a89ec9",
    fontSize: 15, fontWeight: active ? 800 : 500, cursor: "pointer", transition: "all 0.2s",
    borderRadius: 12,
  });

  const subTabStyle = (active) => ({
    flex: 1, padding: "11px 0", borderRadius: 12, border: "none",
    background: active ? "rgba(255,255,255,0.12)" : "transparent",
    color: active ? "#fff" : "#a89ec9",
    fontSize: 13, fontWeight: active ? 700 : 400, cursor: "pointer", transition: "all 0.2s",
  });

  const reset = () => { setRecipe(null); setRestaurants(null); setRecipeImage(null); setError(""); };

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#fff", padding: "24px 16px" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } } * { box-sizing: border-box; }`}</style>

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🍽️</div>
        <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, background: "linear-gradient(90deg, #f7971e, #ffd200)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          What Should I Cook?
        </h1>
        <p style={{ color: "#a89ec9", marginTop: 6, fontSize: 14 }}>Discover recipes or find restaurants near you.</p>
      </div>

      <div style={{ maxWidth: 580, margin: "0 auto" }}>

        {/* Main Tab: Cook / Eat Out */}
        <div style={{ display: "flex", gap: 6, background: "rgba(255,255,255,0.06)", borderRadius: 16, padding: 5, marginBottom: 24, border: "1px solid rgba(255,255,255,0.1)" }}>
          <button onClick={() => { setTab("cook"); reset(); }} style={mainTabStyle(tab === "cook")}>
            👨‍🍳 Cook
          </button>
          <button onClick={() => { setTab("eat"); reset(); }} style={mainTabStyle(tab === "eat")}>
            🍴 Eat Out
          </button>
        </div>

        {/* Sub Tab for Cook */}
        {tab === "cook" && (
          <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", borderRadius: 12, padding: 4, marginBottom: 20, border: "1px solid rgba(255,255,255,0.08)" }}>
            <button onClick={() => { setMode("random"); reset(); }} style={subTabStyle(mode === "random")}>🎲 Random Recipe</button>
            <button onClick={() => { setMode("pantry"); reset(); }} style={subTabStyle(mode === "pantry")}>🧺 Use What I Have</button>
          </div>
        )}

        {/* Cuisine Dropdown */}
        <CuisineDropdown cuisine={cuisine} setCuisine={(v) => { setCuisine(v); reset(); }} />

        {/* Cook: Meal Type or Pantry */}
        {tab === "cook" && mode === "random" && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 10 }}>🍽️ Choose a Meal Type</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {MEAL_TYPES.map(m => (
                <button key={m.value} onClick={() => setMealType(m.value)} style={{
                  padding: "7px 14px", borderRadius: 999,
                  border: mealType === m.value ? "2px solid #f7971e" : "2px solid rgba(255,255,255,0.15)",
                  background: mealType === m.value ? "rgba(247,151,30,0.15)" : "rgba(255,255,255,0.05)",
                  color: mealType === m.value ? "#f7971e" : "#ccc",
                  fontSize: 13, fontWeight: mealType === m.value ? 700 : 400, cursor: "pointer",
                }}>{m.label}</button>
              ))}
            </div>
          </div>
        )}

        {tab === "cook" && mode === "pantry" && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 10 }}>🧺 What's in your kitchen?</label>
            <div style={{ background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.15)", borderRadius: 14, padding: "12px 14px", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", minHeight: 52 }}>
              {pantryItems.map((item, i) => (
                <span key={item} style={{ background: `${TAG_COLORS[i % TAG_COLORS.length]}22`, border: `1px solid ${TAG_COLORS[i % TAG_COLORS.length]}55`, color: TAG_COLORS[i % TAG_COLORS.length], borderRadius: 999, padding: "4px 12px", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 6 }}>
                  {item}<span onClick={() => removeItem(item)} style={{ cursor: "pointer", opacity: 0.7, fontSize: 15 }}>×</span>
                </span>
              ))}
              <input value={pantryInput} onChange={e => setPantryInput(e.target.value)} onKeyDown={addPantryItem} onBlur={addPantryItemOnBlur}
                placeholder={pantryItems.length === 0 ? "Type ingredient & press Enter..." : "Add more..."}
                style={{ flex: 1, minWidth: 160, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: 14 }} />
            </div>
            <p style={{ color: "#6b6590", fontSize: 12, marginTop: 8 }}>Press <strong style={{ color: "#a89ec9" }}>Enter</strong> after each ingredient.</p>
          </div>
        )}

        {error && <p style={{ color: "#ff6b6b", textAlign: "center", marginBottom: 16, fontSize: 14 }}>{error}</p>}

        {/* Action Button */}
        <button onClick={tab === "cook" ? generateRecipe : findRestaurants} disabled={loading} style={{
          width: "100%", padding: "16px", borderRadius: 14, border: "none",
          background: loading ? "#555" : "linear-gradient(90deg, #f7971e, #ffd200)",
          color: loading ? "#999" : "#1a1a2e", fontSize: 16, fontWeight: 800,
          cursor: loading ? "not-allowed" : "pointer", boxShadow: loading ? "none" : "0 4px 24px rgba(247,151,30,0.4)",
        }}>
          {loading
            ? "✨ Finding the best option..."
            : tab === "eat" ? "🍴 Find Restaurants Near Me"
            : mode === "pantry" ? "🧺 Cook With What I Have"
            : "🍽️ Generate Recipe"}
        </button>

        {/* Recipe Card */}
        {recipe && (
          <div style={{ marginTop: 28, background: "rgba(255,255,255,0.06)", borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)", overflow: "hidden" }}>
            <div style={{ width: "100%", height: 220, background: "rgba(255,255,255,0.05)", position: "relative", overflow: "hidden" }}>
              {imageLoading && (
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", border: "3px solid rgba(255,210,0,0.2)", borderTopColor: "#ffd200", animation: "spin 0.8s linear infinite" }} />
                  <span style={{ color: "#a89ec9", fontSize: 13 }}>Loading photo...</span>
                </div>
              )}
              {recipeImage && <img src={recipeImage} alt={recipe.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={() => setRecipeImage(null)} />}
              {!imageLoading && !recipeImage && <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 64 }}>🍽️</div>}
              {recipeImage && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 80, background: "linear-gradient(to top, rgba(15,12,41,0.9), transparent)" }} />}
            </div>

            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, color: "#fff", flex: 1 }}>{recipe.name}</h2>
                <button onClick={shareRecipe} style={{ background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.3)", borderRadius: 20, padding: "6px 14px", color: "#ffd200", fontSize: 12, fontWeight: 700, cursor: "pointer", marginLeft: 10, whiteSpace: "nowrap" }}>
                  {shareMsg || "📤 Share"}
                </button>
              </div>
              <p style={{ color: "#a89ec9", fontSize: 14, margin: "0 0 18px", lineHeight: 1.5 }}>{recipe.description}</p>

              <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
                {[{ icon: "⏱️", label: `${recipe.time} min` }, { icon: "📊", label: recipe.difficulty }, { icon: "🍽️", label: `Serves ${recipe.servings}` }].map((s, i) => (
                  <div key={i} style={{ background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.2)", borderRadius: 999, padding: "5px 14px", fontSize: 13, color: "#ffd200", fontWeight: 600 }}>{s.icon} {s.label}</div>
                ))}
              </div>

              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Ingredients</h3>
              <ul style={{ margin: "0 0 20px", paddingLeft: 20 }}>
                {recipe.ingredients.map((ing, i) => <li key={i} style={{ color: "#ddd", fontSize: 14, marginBottom: 5 }}>{ing}</li>)}
              </ul>

              <h3 style={{ fontSize: 13, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>Instructions</h3>
              {recipe.steps.map((step, i) => (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                  <div style={{ minWidth: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #f7971e, #ffd200)", color: "#1a1a2e", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</div>
                  <p style={{ color: "#ddd", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{step}</p>
                </div>
              ))}

              {recipe.tip && (
                <div style={{ background: "rgba(247,151,30,0.08)", border: "1px solid rgba(247,151,30,0.25)", borderRadius: 12, padding: "12px 16px", marginBottom: 16 }}>
                  <span style={{ fontWeight: 700, color: "#f7971e", fontSize: 13 }}>👨‍🍳 Chef's Tip: </span>
                  <span style={{ color: "#ccc", fontSize: 13 }}>{recipe.tip}</span>
                </div>
              )}

              <button onClick={generateRecipe} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "2px solid rgba(255,210,0,0.3)", background: "transparent", color: "#ffd200", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                🍽️ Try Another Recipe
              </button>
            </div>
          </div>
        )}

        {/* Eat Out Results */}
        {restaurants && (
          <div style={{ marginTop: 28 }}>
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#ffd200", marginBottom: 16 }}>🍴 {cuisine} Restaurants to Look For</h2>
            {restaurants.map((r, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.06)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.1)", padding: 20, marginBottom: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#fff" }}>{r.name}</h3>
                  <span style={{ background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.2)", borderRadius: 999, padding: "3px 10px", fontSize: 12, color: "#ffd200", fontWeight: 700, marginLeft: 10 }}>{r.priceRange}</span>
                </div>
                <p style={{ color: "#a89ec9", fontSize: 13, margin: "0 0 14px" }}>{r.vibe}</p>

                <p style={{ fontSize: 12, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Must Order</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {r.mustOrder.map((dish, j) => (
                    <span key={j} style={{ background: "rgba(247,151,30,0.1)", border: "1px solid rgba(247,151,30,0.25)", borderRadius: 999, padding: "4px 12px", fontSize: 12, color: "#f7971e" }}>{dish}</span>
                  ))}
                </div>

                <a href={`https://www.google.com/maps/search/${encodeURIComponent(r.searchTip)}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.3)", borderRadius: 20, padding: "7px 16px", color: "#ffd200", fontSize: 12, fontWeight: 700, textDecoration: "none" }}>
                  📍 Find on Google Maps
                </a>
              </div>
            ))}
            <button onClick={findRestaurants} style={{ width: "100%", padding: "12px", borderRadius: 12, border: "2px solid rgba(255,210,0,0.3)", background: "transparent", color: "#ffd200", fontSize: 14, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>
              🔄 Find Different Restaurants
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
