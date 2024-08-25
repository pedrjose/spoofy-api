import { Request, Response, NextFunction } from "express";

import {
  signUpService,
  loginService,
  authService,
  createPlaylistService,
  removePlaylistService,
  addLyricService,
  removeLyricService,
  findPlaylistByUserService,
  findPlaylistByIdService
} from "../services/user.service";

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

export const createPlaylistController = async (req: Request, res: Response) => {
  const { id, playlistName } = req.body;
  try {
    const createPlaylist = await createPlaylistService(id, playlistName);

    res.send(createPlaylist);
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

export const removePlaylistController = async (req: Request, res: Response) => {
  const { id, playlistId } = req.body;

  try {
    const removePlaylist = await removePlaylistService(id, playlistId);

    res.send(removePlaylist);
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

export const addLyricController = async (req: Request, res: Response) => {
  const { id, playlistId, artist, musicName, musicLyric, translate, badwords } =
    req.body;

  try {
    const saveLyric = await addLyricService(id, playlistId, {
      artist,
      musicName,
      musicLyric,
      translate,
      badwords
    });

    res.send(saveLyric);
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

export const removeLyricController = async (req: Request, res: Response) => {
  const { id, playlistId, musicName } = req.body;

  try {
    const removeLyric = await removeLyricService(id, playlistId, musicName);

    res.send(removeLyric);
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

export const findPlaylistByUserController = async (
  req: Request,
  res: Response
) => {
  const { userId } = req.body;

  try {
    const userPlaylists = await findPlaylistByUserService(userId);

    res.send(userPlaylists);
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

export const findPlaylistByIdController = async (
  req: Request,
  res: Response
) => {
  const { userId, playlistId } = req.body;

  try {
    const playlist = await findPlaylistByIdService(userId, playlistId);

    res.send(playlist);
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
