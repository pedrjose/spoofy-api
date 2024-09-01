import { Request, Response } from "express";

import { 
    createPlaylistService,
    removePlaylistService, 
    findPlaylistByUserService, 
    findPlaylistByIdService 
} from "../../services/user.service";

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
  