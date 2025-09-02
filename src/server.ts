import app from "./app.js";
import { connectRedis } from "./redis/index.js";

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await connectRedis();
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1); // Gracefully exit if Redis fails
  }
}

startServer();
