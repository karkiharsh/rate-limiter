import { Request, Response } from "express";
import { addCounter } from "../redis/operations.js";
import { WINDOW_SIZE, MAX_REQUESTS } from "../config/rate-limiting.js";

const rateLimit = async (key:string) => {

  const hitCount: number = await addCounter(key, WINDOW_SIZE);
  if(hitCount > MAX_REQUESTS) {
    return false; // rate limit exceeded
  }
  return true; // within rate limit
}

export {rateLimit}; 