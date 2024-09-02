import { Request, Response, NextFunction } from "express";

import { ErrorHandler } from "../utils/response";

export const errorMiddleware = (
  err: Error | ErrorHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof ErrorHandler) {
    return res.status(err.statusCode).json({
      status: "Error",
      statusCode: err.statusCode,
      message: err.message,
    });
  } else {
    return res
      .status(500)
      .json({ status: "Error", statusCode: 500, message: err.message });
  }
};
