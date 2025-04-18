import { IncomingMessage } from "http";

export const clientIpResolver = (
  req: IncomingMessage,
  useReverseProxy: boolean
): string => {
  const xff: string | string[] | undefined = req.headers["x-forwarded-for"];
  const lastProxy: string = req.socket.remoteAddress || ""; // Get the last proxy IP address
  let ip: string;
  if (useReverseProxy) {
    if (Array.isArray(xff)) {
      ip = xff[0].split(",")[0].trim(); // Get the first IP from the list
    } else if (typeof xff === "string") {
      ip = xff.split(",")[0].trim(); // Get the first IP from the list
    } else {
      ip = lastProxy; // Fallback to the last proxy IP address
    }
  } else {
    ip = lastProxy; // Fallback to the last proxy IP address
  }

  return ip;
};
