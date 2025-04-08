"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const http = __importStar(require("http"));
// Store request counts (IP → timestamp array)
const requestCounts = new Map();
// Rate Limit Config
const WINDOW_SIZE = 6000; // 6 seconds
const MAX_REQUESTS = 5;
const rateLimiter = (req, res) => {
    const ip = req.socket.remoteAddress || ""; // Add a fallback in case remoteAddress is undefined
    const now = Date.now();
    if (!requestCounts.has(ip)) {
        requestCounts.set(ip, []);
    }
    // Filter timestamps to keep only requests within the last minute
    const timestamps = requestCounts
        .get(ip)
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
const server = http.createServer((req, res) => {
    if (!rateLimiter(req, res))
        return; // Apply Rate Limiter First
    // Actual API logic (runs only if not rate-limited)
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, API Response!");
});
server.listen(3000, () => console.log("Server running on port 3000"));
