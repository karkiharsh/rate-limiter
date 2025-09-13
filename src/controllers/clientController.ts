// src/controllers/clientController.ts
import { Request, Response } from 'express';
import crypto from 'crypto';
import { clients, clientConfigs } from '../repository/inMemory';
import { ClientConfig } from '../types/client';

// Register a new client
export const registerClient = (req: Request, res: Response) => {
  const { clientName, tier } = req.body;

  if (!clientName || !tier) {
    return res.status(400).json({ error: 'clientName and tier are required' });
  }

  const id = crypto.randomUUID();
  const apiKey = crypto.randomBytes(16).toString('hex');
  const createdAt = new Date();

  // Store client info
  clients[id] = { id, name: clientName, tier, createdAt, apiKey };

  // Initialize empty config (default values can be set here or later)
  clientConfigs[id] = { clientId: id, rateLimit: tier === 'premium' ? 1000 : 100 };

  return res.status(201).json({ apiKey });
};

// Get all clients (optional, for testing)
export const getClients = (_req: Request, res: Response) => {
  return res.json({ clients });
};

// Get config for a specific client
export const getClientConfig = (req: Request, res: Response) => {
  const { clientId } = req.params;

  const config: ClientConfig | undefined = clientConfigs[clientId];
  if (!config) {
    return res.status(404).json({ error: 'Client config not found' });
  }

  return res.json(config);
};

// Update client config
export const updateClientConfig = (req: Request, res: Response) => {
  const { clientId } = req.params;
  const { rateLimit, allowedIPs } = req.body;

  const config = clientConfigs[clientId];
  if (!config) {
    return res.status(404).json({ error: 'Client config not found' });
  }

  if (rateLimit !== undefined) config.rateLimit = rateLimit;
  if (allowedIPs !== undefined) config.allowedIPs = allowedIPs;

  return res.json(config);
};
