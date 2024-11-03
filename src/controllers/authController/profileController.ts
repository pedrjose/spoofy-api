import { Request, Response } from "express";
import createHttpError from "http-errors";

import { asyncWrapper } from "../utils/asyncWrapper";
import { logger, sendError, sendResponse } from "../../helpers";
import { userService } from "../../services/userService";
import { messages } from "../../messages";

const profileController = {
  getProfile: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req;

      if (!userId) {
        logger.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const user = await userService.findUserById(userId);

      if (!user) {
        logger.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      return sendResponse(
        res,
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          photo: user.photo,
          myPlaylists: user.myPlaylists,
        },
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  updateProfile: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req;

      if (!userId) {
        logger.error(messages.INVALID_TOKEN);
        throw createHttpError(401, messages.INVALID_TOKEN);
      }

      const { name, email } = req.body;

      const updatedUser = await userService.findAndUpdateUserById({
        id: userId,
        name: name,
        email: email,
      });

      if (!updatedUser) {
        logger.error(messages.UNABLE_UPDATE_USER);
        return sendError(res, createHttpError(400, messages.UNABLE_UPDATE_USER));
      }

      return sendResponse(
        res,
        {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          photo: updatedUser.photo,
          myPlaylists: updatedUser.myPlaylists,
        },
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, error);
    }
  }),

  updatePerfilImage: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req;

      if (!userId) {
        logger.error(messages.INVALID_TOKEN);
        throw createHttpError(401, messages.INVALID_TOKEN);
      }

      const photoPath = req.file;

      if (!photoPath) {
        logger.error(messages.UPLOAD_FAILED);
        throw createHttpError(400, messages.UPLOAD_FAILED);
      }

      const updatedUser = await userService.findAndUpdateUserById({
        id: userId,
        photo: photoPath?.path,
      });

      if (!updatedUser) {
        logger.error(messages.UNABLE_UPDATE_USER);
        return sendError(res, createHttpError(400, messages.UNABLE_UPDATE_USER));
      }

      return sendResponse(
        res,
        {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role,
          photo: updatedUser.photo,
          myPlaylists: updatedUser.myPlaylists,
        },
        200,
      );

    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, error);
    }
  }),
};

export default profileController;