const Redis = require("ioredis"); // Create a Redis client
const redis = new Redis(); // Defaults to localhost:6379

// Error handling for Redis connection
redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

// Example usage of set and get
async function main() {
  try {
    await redis.set("key", "value");
    const value = await redis.get("key");
    console.log(value); // "value"
  } catch (err) {
    console.error("Error interacting with Redis:", err);
  }
}

main().catch(console.error);
