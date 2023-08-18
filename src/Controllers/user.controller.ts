import { Request, Response } from "express";

import { signUpService } from "../Services/user.service";

export const signUpController = async (req: Request, res: Response) => {
  const { email, password, avatar } = req.body;

  try {
    const signUp = await signUpService(email, password, avatar);

    res.send(signUp);
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
