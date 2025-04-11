const ngrok = require("ngrok");

(async function () {
  try {
    let url = await ngrok.connect(3000);
    console.log("🔗 Ngrok Tunnel URL:", url);
  } catch (error) {
    console.error("❌ Failed to start Ngrok:", error);
  }
})();
