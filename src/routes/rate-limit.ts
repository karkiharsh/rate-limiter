import { Router, Request, Response } from "express";
import { client } from "../redis"; // your Redis client instance

const rateRouter = Router();

// Config
const WINDOW_SIZE = 60; // seconds
const MAX_REQUESTS = 5; // requests per window
rateRouter.get("/check-limit", async (req: Request, res: Response):Promise<any> => {
  const apiKey = req.header("x-api-key");
  if (!apiKey) {
    return res.status(400).json({ error: "x-api-key header is required" });
  }

  try {
    const now = Math.floor(Date.now() / 1000); // current time in seconds
    const windowStart = now - (now % WINDOW_SIZE); // fixed window start
    const redisKey = `rate:${apiKey}:${windowStart}`;

    // get current request count
    const count = parseInt((await client.get(redisKey)) || "0", 10);

    res.status(200).json({
      apiKey,
      windowStart,
      current: count,
      limit: MAX_REQUESTS
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
async function checkRateLimit(apiKey: string): Promise<{ allowed: boolean; retryAfter?: number }> {
  const now = Math.floor(Date.now() / 1000);
  const windowStart = now - (now % WINDOW_SIZE);
  const redisKey = `rate:${apiKey}:${windowStart}`;

  // increment counter atomically
  const count = await client.incr(redisKey);

  if (count === 1) {
    // first request in this window → set expiry
    await client.expire(redisKey, WINDOW_SIZE);
  }

  if (count > MAX_REQUESTS) {
    // blocked → compute retryAfter
    const ttl = await client.ttl(redisKey);
    return { allowed: false, retryAfter: ttl };
  }

  return { allowed: true };
}
rateRouter.get("/enforce", async (req: Request, res: Response) :Promise<any> => {
  const apiKey = req.header("x-api-key");
  if (!apiKey) {
    return res.status(400).json({ error: "x-api-key header is required" });
  }

  try {
    const result = await checkRateLimit(apiKey);

    res.status(200).json({
      allowed: result.allowed,
      retryAfter: result.retryAfter ?? 0
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export {rateRouter}; 