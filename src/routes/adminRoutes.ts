// src/routes/adminRoutes.ts
import { Request, Response, RequestHandler, Router } from 'express';
import { validateAdminKey } from '../middlewares/validateAdminKey.js';
import { client } from '../redis/index.js';
import { ClientConfig } from '../types';

const router = Router();

router.use(validateAdminKey as RequestHandler); // routing level middleware

// GET /admin/clients → List all clients
router.get('/clients', async (req: Request, res: Response) => {
  try {
    const keys = await client.keys('client:*');
    const clients: ClientConfig[] = [];

    for (const key of keys) {
      const val = await client.get(key);
      if (val) {
        clients.push(JSON.parse(val));
      }
    }

    res.json({ clients });
  } catch (err) {
    console.error('Error fetching clients', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//overload mismatch error to be resolved
// PATCH /admin/clients/:id/limits → Update limit/windowMs
// router.patch(
//   '/clients/:id/limits',
//   async (req: Request<Params, any, Body>, res: Response) => {
//   const { id } = req.params;
//   const { limit, windowMs, strategy } = req.body;

//   if (!limit && !windowMs && !strategy) {
//     return res.status(400).json({ error: 'At least one field (limit, windowMs, strategy) required' });
//   }

//   try {
//     const redisKey = `client:${id}`;
//     const clientStr = await redisClient.get(redisKey);
//     if (!clientStr) return res.status(404).json({ error: 'Client not found' });

//     const client: ClientConfig = JSON.parse(clientStr);

//     const updatedClient = {
//       ...client,
//       limit: limit ?? client.limit,
//       windowMs: windowMs ?? client.windowMs,
//       strategy: strategy ?? client.strategy,
//     };

//     await redisClient.set(redisKey, JSON.stringify(updatedClient));
//     res.json({ message: 'Updated successfully', updatedClient });
//   } catch (err) {
//     console.error('Error updating client config', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

export default router;
