/*
import { NextFunction, Request, Response } from "express";

export const corsAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.header("Access-Control-Allow-Origin", ["*"]);
    res.header("Access-Control-Allow-Methods", ["*"]);
    res.header("Access-Control-Allow-Headers", ["*"]);
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).send({
        message: error.message,
        promise: false,
        unexpectedError: false
      });
    } else {
      res.status(500).send({
        message: error,
        promise: false,
        unexpectedError: true
      });
    }
  }
};
*/