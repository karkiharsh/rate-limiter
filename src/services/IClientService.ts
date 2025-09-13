// src/services/clientService.ts
import { ClientConfig } from '../types';
import { RateLimitTier } from '../types';
export interface IClientService {
  registerClient(name: string, tier: RateLimitTier): Promise<ClientConfig>;
  getClientByApiKey(apiKey: string): Promise<ClientConfig | null>;
  updateClientLimits(
    id: string,
    config: Partial<Pick<ClientConfig, 'limit' | 'windowMs' | 'strategy'>>
  ): Promise<void>;
}
