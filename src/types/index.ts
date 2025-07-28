export interface ClientConfig {
  id: string;
  name: string;
  apiKey: string;
  tier: RateLimitTier;
  limit: number;
  windowMs: number;
  strategy?: 'fixed' | 'token';
}

export type RateLimitTier = 'free' | 'pro' | 'custom';

export interface RateLimitResult {
  allowed: boolean;
  retryAfter?: number;
}

export interface UsageLogEntry {
  timestamp: number;
  method: string;
  route: string;
  ip: string;
  status: 'allowed' | 'throttled';
}
