const http = require('http');

// Store request counts (IP → timestamp array)
const requestCounts = new Map();

// Rate Limit Config
const WINDOW_SIZE = 6000; // 6 seconds
const MAX_REQUESTS = 5; // Max 5 requests per minute

// Custom Middleware: Rate Limiter
const rateLimiter = (req, res) => {
  const ip = req.socket.remoteAddress;
  const now = Date.now();

  if (!requestCounts.has(ip)) {
    requestCounts.set(ip, []);
  }

  // Filter timestamps to keep only requests within the last minute
  const timestamps = requestCounts.get(ip).filter(t => now - t < WINDOW_SIZE);
  timestamps.push(now);

  // Update the request map
  requestCounts.set(ip, timestamps);

  if (timestamps.length > MAX_REQUESTS) {
    res.writeHead(429, { 'Content-Type': 'text/plain' });
    res.end('Too many requests, slow down!');
    return false; // Stop further processing
  }

  return true; // Allow request to continue
};

// Create Server
const server = http.createServer((req, res) => {
  if (!rateLimiter(req, res)) return; // Apply Rate Limiter First

  // Actual API logic (runs only if not rate-limited)
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello, API Response!');
});

server.listen(3000, () => console.log('Server running on port 3000'));

