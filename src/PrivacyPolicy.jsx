export default function PrivacyPolicy() {
  return (
    <div style={{ minHeight:"100vh", background:"#0B0B0F", fontFamily:"'Inter',system-ui,sans-serif", color:"#fff", padding:"40px 20px" }}>
      <div style={{ maxWidth:700, margin:"0 auto" }}>
        <a href="/" style={{ color:"#FF7A00", fontSize:13, textDecoration:"none", display:"inline-block", marginBottom:24 }}>← Back to Food Continent</a>
        <h1 style={{ fontSize:32, fontWeight:900, marginBottom:8, background:"linear-gradient(90deg,#FF7A00,#FFC857)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Privacy Policy</h1>
        <p style={{ color:"rgba(255,255,255,0.4)", fontSize:13, marginBottom:40 }}>Last updated: June 27, 2026</p>

        {[
          { title:"1. Introduction", body:`Food Continent ("we", "our", or "us") operates the website foodcontinent.com. This Privacy Policy informs you of our policies regarding the collection, use, and disclosure of personal data when you use our service and the choices you have associated with that data.\n\nBy using our Service, you agree to the collection and use of information in accordance with this policy.` },
          { title:"2. Information We Collect", body:`We collect several types of information for various purposes:\n\n• Usage Data: We automatically collect information on how the Service is accessed and used, including your IP address, browser type, browser version, pages visited, time and date of visit, and other diagnostic data.\n\n• Location Data: With your explicit permission, we collect your geographic location to find nearby restaurants. You can disable this at any time through your device settings.\n\n• User Preferences: We store your dietary preferences and settings locally on your device using browser localStorage. This data never leaves your device.\n\n• Input Data: Ingredients and cuisine preferences you enter are sent to our AI provider (Anthropic) solely to generate recipe results. We do not store this data.` },
          { title:"3. How We Use Your Information", body:`We use the collected data for the following purposes:\n\n• To provide and maintain our Service\n• To generate personalized recipe recommendations using AI\n• To find nearby restaurants based on your location\n• To display relevant advertisements via Google AdSense\n• To monitor usage of the Service\n• To detect, prevent and address technical issues\n• To improve user experience` },
          { title:"4. Google AdSense & Cookies", body:`We use Google AdSense to display advertisements. Google AdSense uses cookies to serve ads based on your prior visits to our website or other websites on the Internet.\n\nGoogle's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other sites on the Internet.\n\nYou may opt out of personalized advertising by visiting Google's Ads Settings at: https://www.google.com/settings/ads\n\nWe also use the following types of cookies:\n• Essential cookies: Required for the website to function\n• Analytics cookies: Help us understand how visitors use our site\n• Advertising cookies: Used by Google AdSense to show relevant ads` },
          { title:"5. Third-Party Services", body:`Our Service uses the following third-party services, each with their own Privacy Policy:\n\n• Google AdSense (advertising) — policies.google.com/privacy\n• Anthropic Claude API (AI recipe generation) — anthropic.com/privacy\n• Google Places API (restaurant search) — policies.google.com/privacy\n• Pexels API (food photography) — pexels.com/privacy-policy\n• Nominatim/OpenStreetMap (location geocoding) — osmfoundation.org/wiki/Privacy_Policy\n\nThese third-party service providers have access to your personal data only to perform specific tasks on our behalf and are obligated not to disclose or use it for any other purpose.` },
          { title:"6. Data Retention", body:`We do not store personal data on our servers. User preferences are stored locally on your device and can be deleted by clearing your browser's localStorage at any time. Location data is used in real-time and never stored.` },
          { title:"7. Data Security", body:`The security of your data is important to us. All data transmission is encrypted using SSL/TLS. While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet or electronic storage is 100% secure.` },
          { title:"8. Children's Privacy", body:`Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you are aware that your child has provided us with personal data, please contact us.` },
          { title:"9. Your Data Rights", body:`Depending on your location, you may have the following rights:\n\n• The right to access your personal data\n• The right to correct inaccurate data\n• The right to request deletion of your data\n• The right to object to processing of your data\n• The right to data portability\n• The right to withdraw consent\n\nTo exercise any of these rights, please contact us at support@foodcontinent.com` },
          { title:"10. GDPR Compliance (EU Users)", body:`If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):\n\n• Legal basis for processing: We process your data based on legitimate interests and consent\n• Data transfers: Any data transferred outside the EU is done so with appropriate safeguards\n• Right to lodge a complaint: You have the right to lodge a complaint with your local data protection authority` },
          { title:"11. CCPA Compliance (California Users)", body:`If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):\n\n• Right to know what personal information is collected\n• Right to know whether personal information is sold or disclosed\n• Right to opt-out of the sale of personal information\n• Right to non-discrimination for exercising your privacy rights\n\nWe do not sell personal information to third parties.` },
          { title:"12. Changes to This Policy", body:`We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.` },
          { title:"13. Contact Us", body:`If you have any questions about this Privacy Policy, please contact us:\n\nEmail: support@foodcontinent.com\nWebsite: https://www.foodcontinent.com/contact\n\nFood Continent\nwww.foodcontinent.com` },
        ].map((section, i) => (
          <div key={i} style={{ marginBottom:32 }}>
            <h2 style={{ fontSize:18, fontWeight:700, color:"#FF7A00", marginBottom:12 }}>{section.title}</h2>
            <p style={{ fontSize:14, color:"rgba(255,255,255,0.6)", lineHeight:1.8, whiteSpace:"pre-line" }}>{section.body}</p>
          </div>
        ))}

        <div style={{ textAlign:"center", marginTop:40, padding:24, background:"rgba(255,122,0,0.06)", borderRadius:16, border:"1px solid rgba(255,122,0,0.15)" }}>
          <p style={{ fontSize:13, color:"rgba(255,255,255,0.4)" }}>Questions about this policy? <a href="mailto:support@foodcontinent.com" style={{ color:"#FF7A00" }}>Contact us</a></p>
        </div>

        <div style={{ textAlign:"center", marginTop:24, display:"flex", justifyContent:"center", gap:24 }}>
          <a href="/" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>Home</a>
          <a href="/about" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>About</a>
          <a href="/contact" style={{ color:"rgba(255,255,255,0.3)", fontSize:12, textDecoration:"none" }}>Contact</a>
        </div>
      </div>
    </div>
  );
}
