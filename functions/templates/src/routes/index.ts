import { Router } from "express";

import templateRouter from "./template.route";

const router = Router();

router.use("/", templateRouter);

export default router;
