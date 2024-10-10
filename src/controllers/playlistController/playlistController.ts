import { Request, Response } from "express";
import createHttpError from "http-errors";

import { asyncWrapper } from "../utils/asyncWrapper";
import { logger, sendError, sendResponse, vagalumeRequest} from "../../helpers";
import { userService } from "../../services/userService";
import { messages } from "../../messages";


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

      let playlist = user?.myPlaylists
      
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

};

export default playlistController;
