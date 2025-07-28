// src/services/usageService.ts
import { UsageLogEntry } from '../types';

export interface IUsageService {
  logRequest(apiKey: string, entry: UsageLogEntry): Promise<void>;
  getUsageStats(clientId: string): Promise<{
    count: number;
    limit: number;
    remaining: number;
    windowReset: number;
  }>;
}
