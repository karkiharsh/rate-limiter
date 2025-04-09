"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rateLimiter = void 0;
// Store request counts (IP → timestamp array)
const requestCounts = new Map();
// Rate Limit Config
const WINDOW_SIZE = 6000; // 6 seconds
const MAX_REQUESTS = 5; // 5 requests per window
// Rate Limiter method
const rateLimiter = (req, res) => {
    const ip = req.socket.remoteAddress || ""; // Add a fallback in case remoteAddress is undefined
    const now = Date.now();
    const date = new Date(now);
    console.log(" IP: ", ip);
    console.log(" Time: ", date.toString());
    if (!requestCounts.has(ip)) {
        requestCounts.set(ip, []);
    }
    // Filter timestamps to keep only requests within the last minute
    const timestamps = requestCounts
        .get(ip)
        .filter((t) => now - t < WINDOW_SIZE); // Use non-null assertion as we've just checked if it exists
    timestamps.push(now);
    console.log(`Allowed requests: ${MAX_REQUESTS} | Current requests: ${timestamps.length}`);
    // Update the request map
    requestCounts.set(ip, timestamps);
    if (timestamps.length > MAX_REQUESTS) {
        res.writeHead(429, { "Content-Type": "text/plain" });
        res.end("Too many requests, slow down!");
        console.log(" Rate limit exceeded for IP: ", ip);
        return false; // Stop further processing
    }
    return true; // Allow request to continue
};
exports.rateLimiter = rateLimiter;
