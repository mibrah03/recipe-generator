import { useState } from "react";

const CUISINES = [
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
];

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
  { label: "🍽️ Surprise Me!", value: "any type of dish" },
];

const TAG_COLORS = ["#ffd200","#f7971e","#a78bfa","#34d399","#60a5fa","#f472b6","#fb923c"];

const UNSPLASH_QUERIES = {
  "noodles or pasta": "noodles pasta dish food",
  "stew or curry": "curry stew bowl food",
  "salad": "fresh salad bowl food",
  "soup": "soup bowl food",
  "grilled dish": "grilled food plate",
  "meat dish": "meat dish plate food",
  "seafood dish": "seafood dish plate",
  "vegetarian dish": "vegetarian food plate",
  "breakfast": "breakfast food plate",
  "dessert": "dessert sweet food",
  "bread or pastry": "bread pastry baked food",
  "any type of dish": "delicious food plate",
};

export default function RecipeGenerator() {
  const [mode, setMode] = useState("random");
  const [cuisine, setCuisine] = useState("");
  const [mealType, setMealType] = useState("");
  const [pantryInput, setPantryInput] = useState("");
  const [pantryItems, setPantryItems] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [recipeImage, setRecipeImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      // Search Wikimedia Commons for food images — free, no API key needed
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
          if (info && info.mime && info.mime.startsWith("image/") && info.url &&
              /\.(jpg|jpeg|png|webp)/i.test(info.url) &&
              !info.url.includes("Flag") && !info.url.includes("Map") && !info.url.includes("Logo")) {
            setRecipeImage(info.url);
            setImageLoading(false);
            return;
          }
        }
      }
      // Fallback: search by cuisine name
      const fallbackQuery = encodeURIComponent(cuisineName + " cuisine dish");
      const fallbackRes = await fetch(
        "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
        fallbackQuery + "&gsrnamespace=6&gsrlimit=10&prop=imageinfo&iiprop=url|mime&format=json&origin=*"
      );
      const fallbackData = await fallbackRes.json();
      const fallbackPages = fallbackData.query?.pages;
      if (fallbackPages) {
        for (const page of Object.values(fallbackPages)) {
          const info = page.imageinfo?.[0];
          if (info && info.mime?.startsWith("image/") && info.url &&
              /\.(jpg|jpeg|png|webp)/i.test(info.url) &&
              !info.url.includes("Flag") && !info.url.includes("Map")) {
            setRecipeImage(info.url);
            setImageLoading(false);
            return;
          }
        }
      }
    } catch (e) {}
    setImageLoading(false);
  };

  const generateRecipe = async () => {
    if (!cuisine) { setError("Pick a cuisine first!"); return; }
    if (mode === "random" && !mealType) { setError("Pick a meal type!"); return; }
    if (mode === "pantry" && pantryItems.length === 0) { setError("Add at least one ingredient!"); return; }

    setError("");
    setLoading(true);
    setRecipe(null);
    setRecipeImage(null);

    const prompt = mode === "random"
      ? `Generate a random authentic ${cuisine} ${mealType} recipe.`
      : `Generate an authentic ${cuisine} recipe using ONLY or mostly these ingredients I have at home: ${pantryItems.join(", ")}. Pick the best dish possible with what's available. You can assume basic pantry staples like salt, pepper, oil, garlic, onion are available even if not listed.`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY, "anthropic-version": "2023-06-01", "anthropic-dangerous-direct-browser-access": "true" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          messages: [{
            role: "user",
            content: `${prompt}
Respond ONLY with a JSON object, no markdown, no backticks, no explanation. Use this exact structure:
{
  "name": "Recipe Name",
  "description": "One enticing sentence about this dish",
  "time": "Total time in minutes as a number",
  "difficulty": "Easy, Medium, or Hard",
  "servings": "Number of servings as a number",
  "ingredients": ["ingredient 1 with quantity", "ingredient 2 with quantity"],
  "steps": ["Step 1 instruction", "Step 2 instruction"],
  "tip": "One useful chef's tip"
}`
          }]
        })
      });

      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setRecipe(parsed);
      // Fetch image in parallel after recipe is ready
      fetchImage(parsed.name, cuisine);
    } catch (err) {
      setError("Something went wrong. Try again!");
    }
    setLoading(false);
  };

  const tabStyle = (active) => ({
    flex: 1, padding: "11px 0", borderRadius: 12, border: "none",
    background: active ? "linear-gradient(90deg, #f7971e, #ffd200)" : "transparent",
    color: active ? "#1a1a2e" : "#a89ec9",
    fontSize: 14, fontWeight: active ? 800 : 500, cursor: "pointer", transition: "all 0.2s",
  });

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
      fontFamily: "'Segoe UI', system-ui, sans-serif",
      color: "#fff", padding: "24px 16px",
    }}>
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>🍽️</div>
        <h1 style={{
          fontSize: 28, fontWeight: 800, margin: 0,
          background: "linear-gradient(90deg, #f7971e, #ffd200)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          letterSpacing: "-0.5px",
        }}>What Should I Cook?</h1>
        <p style={{ color: "#a89ec9", marginTop: 6, fontSize: 14 }}>
          Pick a cuisine — then roll the dice or use what you've got.
        </p>
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto" }}>

        {/* Mode Tabs */}
        <div style={{
          display: "flex", gap: 6, background: "rgba(255,255,255,0.06)",
          borderRadius: 14, padding: 5, marginBottom: 24,
          border: "1px solid rgba(255,255,255,0.1)"
        }}>
          <button onClick={() => { setMode("random"); setRecipe(null); setRecipeImage(null); setError(""); }} style={tabStyle(mode === "random")}>
            🍽️ Random Recipe
          </button>
          <button onClick={() => { setMode("pantry"); setRecipe(null); setRecipeImage(null); setError(""); }} style={tabStyle(mode === "pantry")}>
            🧺 Use What I Have
          </button>
        </div>

        {/* Cuisine */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
            🌍 Choose a Cuisine
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {CUISINES.map(c => (
              <button key={c.value} onClick={() => setCuisine(c.value)} style={{
                padding: "7px 14px", borderRadius: 999,
                border: cuisine === c.value ? "2px solid #ffd200" : "2px solid rgba(255,255,255,0.15)",
                background: cuisine === c.value ? "rgba(255,210,0,0.15)" : "rgba(255,255,255,0.05)",
                color: cuisine === c.value ? "#ffd200" : "#ccc",
                fontSize: 13, fontWeight: cuisine === c.value ? 700 : 400,
                cursor: "pointer", transition: "all 0.15s",
              }}>
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Random Mode: Meal Type */}
        {mode === "random" && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              🍽️ Choose a Meal Type
            </label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {MEAL_TYPES.map(m => (
                <button key={m.value} onClick={() => setMealType(m.value)} style={{
                  padding: "7px 14px", borderRadius: 999,
                  border: mealType === m.value ? "2px solid #f7971e" : "2px solid rgba(255,255,255,0.15)",
                  background: mealType === m.value ? "rgba(247,151,30,0.15)" : "rgba(255,255,255,0.05)",
                  color: mealType === m.value ? "#f7971e" : "#ccc",
                  fontSize: 13, fontWeight: mealType === m.value ? 700 : 400,
                  cursor: "pointer", transition: "all 0.15s",
                }}>
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pantry Mode */}
        {mode === "pantry" && (
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: "#ffd200", textTransform: "uppercase", display: "block", marginBottom: 10 }}>
              🧺 What's in your kitchen?
            </label>
            <div style={{
              background: "rgba(255,255,255,0.06)", border: "2px solid rgba(255,255,255,0.15)",
              borderRadius: 14, padding: "12px 14px",
              display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", minHeight: 52,
            }}>
              {pantryItems.map((item, i) => (
                <span key={item} style={{
                  background: `${TAG_COLORS[i % TAG_COLORS.length]}22`,
                  border: `1px solid ${TAG_COLORS[i % TAG_COLORS.length]}55`,
                  color: TAG_COLORS[i % TAG_COLORS.length],
                  borderRadius: 999, padding: "4px 12px",
                  fontSize: 13, fontWeight: 600,
                  display: "flex", alignItems: "center", gap: 6,
                }}>
                  {item}
                  <span onClick={() => removeItem(item)} style={{ cursor: "pointer", opacity: 0.7, fontSize: 15, lineHeight: 1 }}>×</span>
                </span>
              ))}
              <input
                value={pantryInput}
                onChange={e => setPantryInput(e.target.value)}
                onKeyDown={addPantryItem}
                onBlur={addPantryItemOnBlur}
                placeholder={pantryItems.length === 0 ? "Type ingredient & press Enter (e.g. chicken, rice...)" : "Add more..."}
                style={{
                  flex: 1, minWidth: 160, background: "transparent",
                  border: "none", outline: "none", color: "#fff", fontSize: 14, padding: "2px 0",
                }}
              />
            </div>
            <p style={{ color: "#6b6590", fontSize: 12, marginTop: 8 }}>
              Press <strong style={{ color: "#a89ec9" }}>Enter</strong> or <strong style={{ color: "#a89ec9" }}>comma</strong> after each ingredient.
            </p>
          </div>
        )}

        {error && <p style={{ color: "#ff6b6b", textAlign: "center", marginBottom: 16, fontSize: 14 }}>{error}</p>}

        {/* Generate Button */}
        <button onClick={generateRecipe} disabled={loading} style={{
          width: "100%", padding: "16px", borderRadius: 14, border: "none",
          background: loading ? "#555" : "linear-gradient(90deg, #f7971e, #ffd200)",
          color: loading ? "#999" : "#1a1a2e",
          fontSize: 16, fontWeight: 800, cursor: loading ? "not-allowed" : "pointer",
          letterSpacing: 0.5, transition: "all 0.2s",
          boxShadow: loading ? "none" : "0 4px 24px rgba(247,151,30,0.4)",
        }}>
          {loading ? "✨ Finding the perfect recipe..." : mode === "pantry" ? "🧺 Cook With What I Have" : "🍽️ Generate Recipe"}
        </button>

        {/* Recipe Card */}
        {recipe && (
          <div style={{
            marginTop: 28, background: "rgba(255,255,255,0.06)",
            borderRadius: 20, border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden", backdropFilter: "blur(10px)",
          }}>
            {/* Hero Image */}
            <div style={{
              width: "100%", height: 220, background: "rgba(255,255,255,0.05)",
              position: "relative", overflow: "hidden",
            }}>
              {imageLoading && (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: 8,
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: "50%",
                    border: "3px solid rgba(255,210,0,0.2)",
                    borderTopColor: "#ffd200",
                    animation: "spin 0.8s linear infinite",
                  }} />
                  <span style={{ color: "#a89ec9", fontSize: 13 }}>Loading photo...</span>
                </div>
              )}
              {recipeImage && (
                <img
                  src={recipeImage}
                  alt={recipe.name}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    display: "block",
                  }}
                  onError={() => setRecipeImage(null)}
                />
              )}
              {!imageLoading && !recipeImage && (
                <div style={{
                  position: "absolute", inset: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 64,
                }}>
                  🍽️
                </div>
              )}
              {/* Gradient overlay */}
              {recipeImage && (
                <div style={{
                  position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
                  background: "linear-gradient(to top, rgba(15,12,41,0.9), transparent)",
                }} />
              )}
            </div>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

            {/* Recipe Content */}
            <div style={{ padding: 24 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 6px", color: "#fff" }}>{recipe.name}</h2>
              <p style={{ color: "#a89ec9", fontSize: 14, margin: "0 0 18px", lineHeight: 1.5 }}>{recipe.description}</p>

              <div style={{ display: "flex", gap: 12, marginBottom: 22, flexWrap: "wrap" }}>
                {[
                  { icon: "⏱️", label: `${recipe.time} min` },
                  { icon: "📊", label: recipe.difficulty },
                  { icon: "🍽️", label: `Serves ${recipe.servings}` },
                ].map((stat, i) => (
                  <div key={i} style={{
                    background: "rgba(255,210,0,0.1)", border: "1px solid rgba(255,210,0,0.2)",
                    borderRadius: 999, padding: "5px 14px", fontSize: 13, color: "#ffd200", fontWeight: 600,
                  }}>
                    {stat.icon} {stat.label}
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                  Ingredients
                </h3>
                <ul style={{ margin: 0, paddingLeft: 20 }}>
                  {recipe.ingredients.map((ing, i) => (
                    <li key={i} style={{ color: "#ddd", fontSize: 14, marginBottom: 5, lineHeight: 1.5 }}>{ing}</li>
                  ))}
                </ul>
              </div>

              <div style={{ marginBottom: 20 }}>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: "#f7971e", textTransform: "uppercase", letterSpacing: 1, marginBottom: 10 }}>
                  Instructions
                </h3>
                {recipe.steps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "flex-start" }}>
                    <div style={{
                      minWidth: 26, height: 26, borderRadius: "50%",
                      background: "linear-gradient(135deg, #f7971e, #ffd200)",
                      color: "#1a1a2e", fontWeight: 800, fontSize: 12,
                      display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                    }}>
                      {i + 1}
                    </div>
                    <p style={{ color: "#ddd", fontSize: 14, margin: 0, lineHeight: 1.6 }}>{step}</p>
                  </div>
                ))}
              </div>

              {recipe.tip && (
                <div style={{
                  background: "rgba(247,151,30,0.08)", border: "1px solid rgba(247,151,30,0.25)",
                  borderRadius: 12, padding: "12px 16px",
                }}>
                  <span style={{ fontWeight: 700, color: "#f7971e", fontSize: 13 }}>👨‍🍳 Chef's Tip: </span>
                  <span style={{ color: "#ccc", fontSize: 13 }}>{recipe.tip}</span>
                </div>
              )}

              <button onClick={generateRecipe} style={{
                marginTop: 20, width: "100%", padding: "12px", borderRadius: 12,
                border: "2px solid rgba(255,210,0,0.3)", background: "transparent",
                color: "#ffd200", fontSize: 14, fontWeight: 700, cursor: "pointer",
              }}>
                🍽️ Try Another Recipe
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
