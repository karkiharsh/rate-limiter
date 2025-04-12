import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import { clientIpResolver } from "./client-ip-resolver";
import { USE_REVERSE_PROXY } from "../config/config";
import { WINDOW_SIZE } from "../config/config";
import { MAX_REQUESTS } from "../config/config";
// Store request counts (IP → timestamp array)
const requestCounts: Map<string, number[]> = new Map();

// Rate Limiter method
export const rateLimiter = (
  req: IncomingMessage,
  res: ServerResponse
): boolean => {
  const ipAddress: string = clientIpResolver(req, USE_REVERSE_PROXY);
  const now: number = Date.now();
  const date: Date = new Date(now);

  console.log(" IP: ", ipAddress);
  console.log(" Time: ", date.toString());

  if (!requestCounts.has(ipAddress)) {
    requestCounts.set(ipAddress, []);
  }

  // Filter timestamps to keep only requests within the last minute
  const timestamps: number[] = requestCounts
    .get(ipAddress)!
    .filter((t) => now - t < WINDOW_SIZE); // Use non-null assertion as we've just checked if it exists
  timestamps.push(now);
  console.log(
    `Allowed requests: ${MAX_REQUESTS} | Current requests: ${timestamps.length}`
  );
  // Update the request map
  requestCounts.set(ipAddress, timestamps);

  if (timestamps.length > MAX_REQUESTS) {
    res.writeHead(429, { "Content-Type": "text/plain" });
    res.end("Too many requests, slow down!");
    console.log(" Rate limit exceeded for IP: ", ipAddress);
    return false; // Stop further processing
  }

  return true; // Allow request to continue
};
