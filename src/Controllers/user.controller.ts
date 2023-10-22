import { Request, Response } from "express";
import { IPlaylist, ILyric } from "../Interfaces/User";

import {
  signUpService,
  loginService,
  authService,
  createPlaylistService
} from "../Services/user.service";

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

export const authController = async (req: Request, res: Response) => {
  const { authorization } = req.headers;

  try {
    const session = await authService(authorization);

    res.send(session);
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

export const createPlaylistController = async (req: Request, res: Response) => {
  try {
    const { id, playlistName } = req.body;

    const newPlaylist: IPlaylist = {
      playlistName: playlistName,
      playlistLyrics: []
    };

    const createPlaylist = await createPlaylistService(id, newPlaylist);
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
