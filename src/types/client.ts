export interface Client {
  id: string;
  name: string;
  tier: string;
  createdAt: Date;
  apiKey: string;
}

export interface ClientConfig {
  clientId: string;
  rateLimit: number;
  allowedIPs?: string[];
}
