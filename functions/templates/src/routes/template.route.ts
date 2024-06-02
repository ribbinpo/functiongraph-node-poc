import { Router } from "express";

import templateController from "../controllers/template.controller";
import templateSchema from "../schemas/template.schema";

import { pagination } from "../../../../shares/schemas/general.schema";
import { handleValidateSchema } from "../../../../shares/middlewares/validator.middleware";
import { param } from "express-validator";

const router = Router();

router.get("/", pagination(), handleValidateSchema, templateController.getAll);

router.post(
  "/",
  templateSchema.create(),
  handleValidateSchema,
  templateController.create
);

router.put(
  "/:id",
  templateSchema.update(),
  handleValidateSchema,
  templateController.update
);

router.delete(
  "/:id",
  param("id").isString().notEmpty(),
  templateController.remove
);

export default router;
