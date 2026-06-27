export default function About() {
  return (
    <div style={{ minHeight:"100vh", background:"#0B0B0F", fontFamily:"'Inter',system-ui,sans-serif", color:"#fff", padding:"40px 20px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <a href="/" style={{ color:"#FF7A00", fontSize:13, textDecoration:"none", display:"inline-block", marginBottom:24 }}>← Back to Food Continent</a>

        <div style={{ textAlign:"center", marginBottom:48 }}>
          <div style={{ fontSize:64, marginBottom:16 }}>🍽️</div>
          <h1 style={{ fontSize:36, fontWeight:900, marginBottom:12, background:"linear-gradient(90deg,#FF7A00,#FFC857)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>About Food Continent</h1>
          <p style={{ fontSize:16, color:"rgba(255,255,255,0.5)", lineHeight:1.7, maxWidth:500, margin:"0 auto" }}>
            Your AI-powered food discovery platform. We help you decide what to cook or where to eat — every single day.
          </p>
        </div>

        {[
          { icon:"🎯", title:"Our Mission", body:"We solve one of life's most common daily problems — figuring out what to eat. Whether you're staring at an empty fridge or can't decide where to go out, Food Continent gives you instant, personalized answers powered by artificial intelligence." },
          { icon:"🤖", title:"How It Works", body:"Food Continent uses advanced AI to generate authentic recipes from over 40 world cuisines. Simply pick a cuisine, set your dietary preferences, and let our AI create a complete recipe tailored just for you — with ingredients, step-by-step instructions, cooking timers, nutrition info, and ingredient substitutions." },
          { icon:"🌍", title:"40+ World Cuisines", body:"From Italian pasta to Malaysian curry, Nigerian jollof to Iraqi dolma, Sudanese ful to Peruvian ceviche — we cover cuisines from every continent on Earth. Every recipe is authentically inspired and can be translated into 11 languages including Arabic, Spanish, French, Malay, and more." },
          { icon:"🍴", title:"Find Nearby Restaurants", body:"Not in the mood to cook? Our Eat Out mode uses your real GPS location to find actual restaurants near you. See their ratings, opening hours, signature dishes with photos, and order directly through Uber Eats, DoorDash, or GrubHub — all in one place." },
          { icon:"⚡", title:"Smart Features", body:"• ⏱️ Time filter — find recipes under 15, 30, or 45 minutes\n• 🔄 Ingredient substitutions — swap out anything you don't have\n• 👥 Serving size adjuster — scale ingredients automatically\n• 🛒 Shopping list — with share and copy options\n• 👨‍🍳 Cooking mode — distraction-free step-by-step cooking\n• 🖼️ Share as image — beautiful recipe cards\n• 🔍 Recipe search — find any dish instantly\n• 📊 Nutrition info — calories, protein, carbs, fat\n• 🌐 11 languages supported" },
          { icon:"🔒", title:"Your Privacy", body:"We take your privacy seriously. We don't require you to create an account. Your preferences are stored locally on your device. We only access your location when you explicitly allow it to find nearby restaurants. Read our full Privacy Policy for details." },
        ].map((section, i) => (
          <div key={i} style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:24, marginBottom:16, border:"1px solid rgba(255,255,255,0.06)" }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#fff", marginBottom:10, display:"flex", alignItems:"center", gap:10 }}>
              <span>{section.icon}</span>{section.title}
            </h2>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.8, whiteSpace:"pre-line" }}>{section.body}</p>
          </div>
        ))}

        <div style={{ textAlign:"center", marginTop:40, padding:32, background:"rgba(255,122,0,0.06)", borderRadius:20, border:"1px solid rgba(255,122,0,0.15)" }}>
          <p style={{ fontSize:16, fontWeight:700, color:"#fff", marginBottom:8 }}>Get in touch</p>
          <p style={{ fontSize:14, color:"rgba(255,255,255,0.4)", marginBottom:12 }}>Questions, feedback, or partnership inquiries?</p>
          <a href="mailto:support@foodcontinent.com" style={{ color:"#FF7A00", fontSize:15, fontWeight:700 }}>support@foodcontinent.com</a>
        </div>

        <div style={{ textAlign:"center", marginTop:32, display:"flex", justifyContent:"center", gap:24 }}>
          <a href="/" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>Home</a>
          <a href="/privacy" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>Privacy Policy</a>
          <a href="/contact" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>Contact</a>
        </div>
      </div>
    </div>
  );
}
