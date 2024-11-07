import { Request, Response } from "express";
import createHttpError from "http-errors";

import { asyncWrapper } from "../utils/asyncWrapper";
import { logger, sendError, sendResponse, geniusRequest} from "../../helpers";
import { messages } from "../../messages";
import { userService } from "../../services/userService";

const reviewController = {
  createReview: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { musicId, image } = req.body
      
      if (!musicId || !image) {
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
};

export default reviewController;