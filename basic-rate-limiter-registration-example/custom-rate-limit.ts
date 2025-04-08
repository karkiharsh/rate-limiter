import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

// Store request counts (IP → timestamp array)
const requestCounts: Map<string, number[]> = new Map();

// Rate Limit Config
const WINDOW_SIZE: number = 6000; // 6 seconds
const MAX_REQUESTS: number = 5;

const rateLimiter = (req: IncomingMessage, res: ServerResponse): boolean => {
  const ip: string = req.socket.remoteAddress || ""; // Add a fallback in case remoteAddress is undefined
  const now: number = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  // Filter timestamps to keep only requests within the last minute
  const timestamps: number[] = requestCounts
    .get(ip)!
    .filter((t) => now - t < WINDOW_SIZE); // Use non-null assertion as we've just checked if it exists
  timestamps.push(now);

  // Update the request map
  requestCounts.set(ip, timestamps);

  if (timestamps.length > MAX_REQUESTS) {
    res.writeHead(429, { "Content-Type": "text/plain" });
    res.end("Too many requests, slow down!");
    return false; // Stop further processing
  }

  return true; // Allow request to continue
};

// Create Server
const server: http.Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (!rateLimiter(req, res)) return; // Apply Rate Limiter First

    // Actual API logic (runs only if not rate-limited)
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, API Response!");
  }
);

server.listen(3000, () => console.log("Server running on port 3000"));
