import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

export const validateMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      status: "Error",
      statusCode: 400,
      message: result.array(),
    });
  }
  next();
};
