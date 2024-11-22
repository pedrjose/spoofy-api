import { Request, Response } from "express";
import createHttpError from "http-errors";

import { hashPassword, logger, sendError, sendResponse } from "../helpers";
import { asyncWrapper } from "./utils/asyncWrapper";

import { messages } from "../messages";
import { userService } from "../services/userService";
import { contentReviewService } from "../services/contentReviewService";
import { IContentReviewPlaylist } from "interfaces/ContentReview";
import { IPlaylist } from "interfaces/User";

const adminController = {
  createAccount: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { name, email, password, role, photo } = req.body;

      const existingUser = await userService.findUserByEmail(email);

      if (existingUser) {
        logger.error(messages.EXISTING_EMAIL);
        return sendError(res, createHttpError(409, messages.EXISTING_EMAIL));
      }

      const hash = await hashPassword(password);

      const myPlaylists: IPlaylist[] = [];

      await userService.create(name, email, hash, role, photo, myPlaylists);

      return sendResponse(res, messages.ACCOUNT_CREATED, 201);
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, error);
    }
  }),

  getUser: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const user = await userService.findUserById(userId);

      if (!user) {
        logger.error(messages.UNABLE_RETRIEVE_USER);
        return sendError(res, createHttpError(404, messages.UNABLE_RETRIEVE_USER));
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
      return sendError(res, error);
    }
  }),

  updateUser: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const { name, password, photo } = req.body;

      let hash: string | undefined;

      if (password) {
        hash = await hashPassword(password);
      }

      const updatedUser = await userService.findAndUpdateUserById({
        id: userId,
        name: name,
        password: hash,
        photo: photo,
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

  deleteUser: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { userId: accountUserId } = req;
      const { userId } = req.params;

      if (accountUserId === userId) {
        logger.error(messages.CANT_DELETE_OWN_USER);
        return sendError(res, createHttpError(409, messages.CANT_DELETE_OWN_USER));
      }

      const deletedUser = await userService.deleteUserById(userId);

      if (!deletedUser) {
        logger.error(messages.UNABLE_DELETE_USER);
        return sendError(res, createHttpError(400, messages.UNABLE_DELETE_USER));
      }

      return sendResponse(
        res,
        "Delete Successful",
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, error);
    }
  }),

  getAllUsers: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const users = await userService.findAllUsers();

      return sendResponse(
        res,
        users.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          role: u.role,
          photo: u.photo,
          myPlaylists: u.myPlaylists,
        })),
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, error);
    }
  }),

  createReview: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { musicId, title, image, url } = req.body
      
      if (!musicId || !image || !url) {
        logger.error(messages.INVALID_BODY);
        throw createHttpError(400, messages.INVALID_BODY);
      }

      const review = await contentReviewService.create(musicId, title, image, url);

      if (!review) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        review,
        200,
      );
    } catch (err) {
      const error = err as Error;

      if (err instanceof Error && 'code' in err && (err as any).code === 11000) {
        logger.error(messages.EXISTING_REVIEW_LYRIC);
        return sendError(res, createHttpError(409, messages.EXISTING_REVIEW_LYRIC));
      }

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  deleteReview: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const reviewId = req.params.reviewId as string;

      if (!reviewId) {
        logger.error(messages.CANNOT_RETRIEVE_USER_DATA);
        throw createHttpError(403, messages.CANNOT_RETRIEVE_USER_DATA);
      }

      const deletedReview = await contentReviewService.deleteContentReviewById(reviewId);

      if (!deletedReview) {
        logger.error(messages.UNABLE_UPDATE_USER);
        return sendError(res, createHttpError(400, messages.UNABLE_UPDATE_USER));
      }

      return sendResponse(
        res,
        "Delete Successful",
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),
};

export default adminController;