import { Router, Request, Response } from "express";
import { client } from "../redis";
import { randomUUID } from "crypto";

const clientRouter = Router();

clientRouter.get("/register", async (req: Request, res: Response) => {
  try {
    // Generate a random unique ID
    const uniqueId = randomUUID();

    // Example value to store
    const value = "uniqey";

    console.log(" uniqueID : ", uniqueId);
    console.log(" value ", value);
    // Save in Redis: key = uniqueId, value = "uniqkey"
    await client.set(uniqueId, value);

    // Return the key to the client
    res.status(201).json({ key: uniqueId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default clientRouter;
