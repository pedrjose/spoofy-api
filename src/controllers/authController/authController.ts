import { Request, Response, NextFunction } from "express";

import { authService } from "../../services/user.service";



export const authController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  try {
    await authService(authorization);

    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({
        message: error.message,
        promise: false,
        expectedError: true
      });
    } else {
      res.status(500).send({
        message: error,
        promise: false,
        expectedError: false
      });
    }
  }
};