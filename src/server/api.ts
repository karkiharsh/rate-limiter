import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { rateLimiter } from "../rate-limiter/custom-rate-limit";
import { port } from "../config/config";

const server: http.Server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    if (!rateLimiter(req, res)) return; // Apply Rate Limiter First

    // Actual API logic (runs only if not rate-limited)
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Hello, API Respns!");
  }
);

server.listen(port, () => console.log(`Server running on port ${port}`));
