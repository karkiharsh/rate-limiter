const ngrok = require("ngrok");

const ngrokRun = async () => {
  try {
    let url = await ngrok.connect(3000); // using PORT from config.js throws error
    console.log("🔗 Ngrok Tunnel URL:", url);
  } catch (error) {
    console.error("❌ Failed to start Ngrok:", error);
  }
};

ngrokRun();
