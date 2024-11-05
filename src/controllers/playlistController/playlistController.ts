import { Request, Response } from "express";
import createHttpError from "http-errors";

import { asyncWrapper } from "../utils/asyncWrapper";
import { logger, sendError, sendResponse } from "../../helpers";
import { userService } from "../../services/userService";
import { messages } from "../../messages";
import { ILyric } from "../../interfaces/User";


interface LyricsBody {
  playlistId: string;
  lyrics: ILyric[];
}

const playlistController = {
  getPlaylists: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req;
      const userPlaylistName = req.query.name as string | undefined;

      if (!userId) {
        logger.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const user = await userService.findUserById(userId);

      let playlist = user?.myPlaylists;
      
      if (userPlaylistName) {
        playlist = playlist?.filter(playlist => playlist.playlistName.toLowerCase().includes(userPlaylistName.toLowerCase()));
      }

      return sendResponse(
        res,
        playlist,
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  createPlaylist: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req;
      const userPlaylistName = req.params.playlistName as string | undefined;

      if (!userId || !userPlaylistName) {
        logger.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const updatePlaylists = await userService.findAndUpdateUserById({id: userId, myPlaylists: [{playlistName: userPlaylistName, playlistLyrics: []}]});

      if (!updatePlaylists) {
        logger.error(messages.UNABLE_UPDATE_USER);
        return sendError(res, createHttpError(400, messages.UNABLE_UPDATE_USER));
      }

      return sendResponse(
        res,
        {
          id: updatePlaylists.id,
          name: updatePlaylists.name,
          email: updatePlaylists.email,
          role: updatePlaylists.role,
          photo: updatePlaylists.photo,
          myPlaylists: updatePlaylists.myPlaylists,
        },
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  updateLyricToPlaylist: asyncWrapper(async (req: Request<{}, {}, LyricsBody>, res: Response) => {
    try {
      const { userId } = req;
      const { playlistId, lyrics } = req.body;

      if (!userId) {
        logger.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const updateLyricsInPlaylist = await userService.updateLyricToUserPlaylist({id: userId, playlistId: playlistId, lyrics: lyrics});

      if (!updateLyricsInPlaylist) {
        logger.error(messages.UNABLE_UPDATE_USER);
        return sendError(res, createHttpError(400, messages.UNABLE_UPDATE_USER));
      }

      return sendResponse(
        res,
        {
          id: updateLyricsInPlaylist.id,
          name: updateLyricsInPlaylist.name,
          email: updateLyricsInPlaylist.email,
          role: updateLyricsInPlaylist.role,
          photo: updateLyricsInPlaylist.photo,
          myPlaylists: updateLyricsInPlaylist.myPlaylists,
        },
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  deletePlaylist: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req;
      const playlistId = req.params.playlistId as string | undefined;

      if (!userId || !playlistId) {
        logger.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const deletePlaylist = await userService.deletePlaylistById(userId, playlistId);

      if (!deletePlaylist) {
        logger.error(messages.UNABLE_UPDATE_USER);
        return sendError(res, createHttpError(400, messages.UNABLE_UPDATE_USER));
      }

      return sendResponse(
        res,
        {
          id: deletePlaylist.id,
          name: deletePlaylist.name,
          email: deletePlaylist.email,
          role: deletePlaylist.role,
          photo: deletePlaylist.photo,
          myPlaylists: deletePlaylist.myPlaylists,
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

export default playlistController;
