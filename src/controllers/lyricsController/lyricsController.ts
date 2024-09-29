/*
import { Request, Response, NextFunction } from "express";

import { addLyricService, removeLyricService } from "../../services/user.service";

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
*/