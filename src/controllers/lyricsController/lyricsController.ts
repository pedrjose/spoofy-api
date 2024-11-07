import { Request, Response } from "express";
import createHttpError from "http-errors";

import { asyncWrapper } from "../utils/asyncWrapper";
import { logger, sendError, sendResponse, geniusRequest} from "../../helpers";
import { messages } from "../../messages";
import { userService } from "../../services/userService";

const lyricsController = {
  getLyrics: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const music = req.query.music ? decodeURIComponent(String(req.query.music)) : '';
      const artist = req.query.artist ? decodeURIComponent(String(req.query.artist)) : '';
      
      if (!music || !artist) {
        logger.error(messages.INVALID_BODY);
        throw createHttpError(400, messages.INVALID_BODY);
      }

      const lyric = await geniusRequest(music, artist);

      if (!lyric) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        lyric,
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  deleteLyricToPlaylist: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req;
      const playlistId = req.params.playlistId as string | undefined;
      const lyricId = req.params.lyricId as string | undefined;

      if (!userId || !playlistId || !lyricId) {
        logger.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const deleteLyric = await userService.deleteLyricById(userId, playlistId, lyricId);

      if (!deleteLyric) {
        logger.error(messages.UNABLE_UPDATE_USER);
        return sendError(res, createHttpError(400, messages.UNABLE_UPDATE_USER));
      }

      return sendResponse(
        res,
        {
          id: deleteLyric.id,
          name: deleteLyric.name,
          email: deleteLyric.email,
          role: deleteLyric.role,
          photo: deleteLyric.photo,
          myPlaylists: deleteLyric.myPlaylists,
        },
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),
};

export default lyricsController;