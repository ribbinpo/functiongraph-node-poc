import express from "express";
import cors from "cors";
import "dotenv/config";

import templateRouter from "./functions/templates/src/routes/index";

import { errorMiddleware } from "./shares/middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/template", templateRouter);

app.get("/health-check", (req, res) => {
  res.status(200).send("Server is running :)");
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
