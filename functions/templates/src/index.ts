import express from "express";
import "dotenv/config";

import { connect, close } from "../../../shares/configs/mongo.config";

const app = express();

app.get("/test1/", (req, res) => {
  res.send("Server is running:)");
});

app.post("/test1/", (req, res) => {
  res.send(req.body);
});

app.get("/test1/test", async (req, res) => {
  const { client } = await connect(process.env.MONGO_URI, "chat-room");
  if (client) await close(client);
  res.send("connected to db");
});

app.get("/test1/test-env", (req, res) => {
  res.send(process.env.test);
})

// NOTE: for local testing
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
