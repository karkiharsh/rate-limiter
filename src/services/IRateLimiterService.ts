// src/services/rateLimiterService.ts
import { RateLimitResult } from '../types';

export interface IRateLimiterService {
  checkLimit(apiKey: string): Promise<RateLimitResult>;
}
