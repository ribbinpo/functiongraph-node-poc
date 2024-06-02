import { body, param } from "express-validator";

export const create = () => {
  return [body("name").isString().notEmpty()];
};

export const update = () => {
  return [
    param("id").isString().notEmpty(),
    body("name").isString().notEmpty(),
  ];
};

export default {
  create,
  update,
};
