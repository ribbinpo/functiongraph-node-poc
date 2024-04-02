import express, { Request, Response, NextFunction } from "express";
import "dotenv/config";

import { connect, close } from "../../../shares/configs/mongo.config";

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running:)");
});

app.post("/", (req, res) => {
  res.send(req.body);
});

app.get("/test", async (req, res) => {
  const { client } = await connect("mongodb+srv://baba:387XtFXJx34yc1ei@clusterbaba.c5zrn4a.mongodb.net/?retryWrites=true&w=majority", "chat-room");
  if (client) await close(client);
  res.send("connected to db");
});

const handleRequest = (req: Request, res: Response, next: NextFunction) => {
  app(req, res, next);
};

export { handleRequest };

// NOTE: for local testing
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
