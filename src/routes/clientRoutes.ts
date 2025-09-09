import { Router, Request, Response } from "express";
import { client } from "../redis";
import { randomUUID } from "crypto";

type RegisterClientRequest = { name: string; tier: string };
type RegisterClientResponse = { apiKey: string };
type ErrorResponse = { error: string };

const clientRouter = Router();

clientRouter.post("/register",async (req: Request, res: Response) :Promise<any>=> {
  try {
      const { name, tier } = req.body;
      if (!name || !tier) {
        return res.status(400).json({ error: "Client name and tier are required" });
      }
      const apiKey = randomUUID();
      const clientId = `client:${apiKey}`;
      await client.set(
        clientId,
        JSON.stringify({ id: apiKey, name, tier, createdAt: new Date().toISOString() })
      );
      return res.status(201).json({ apiKey });
    } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }}
 );
export default clientRouter;


  