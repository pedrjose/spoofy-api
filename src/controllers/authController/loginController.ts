import { Request, Response } from "express";

import { loginService } from "../../services/user.service";

export const loginController = async (req: Request, res: Response) => {
    const { email, password } = req.body;
  
    try {
      const login = await loginService(email, password);
  
      res.send(login);
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