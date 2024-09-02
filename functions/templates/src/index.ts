import express from "express";
import cors from "cors";
import "dotenv/config";

import router from "./routes";

import { errorHandler } from "../../../shares/middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/templates/health-check", (_, res) => {
  res.status(200).send("Server is running :)");
});

app.use("/templates", router);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
