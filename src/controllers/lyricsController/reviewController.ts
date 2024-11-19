import { Request, Response } from "express";
import createHttpError from "http-errors";

import { asyncWrapper } from "../utils/asyncWrapper";
import { logger, sendError, sendResponse, geniusRequest} from "../../helpers";
import { messages } from "../../messages";
import { contentReviewService } from '../../services/contentReviewService';

const reviewController = {
  getAllReviews: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const reviews = await contentReviewService.findAllContentReview();

      if (!reviews) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        reviews,
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  getAllReviewsWithPagination: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      const reviews = await contentReviewService.findAllContentReviewWithPagination(page, limit);

      if (!reviews) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        reviews,
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  getReviewById: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const reviewId = req.params.reviewId as string;

      const reviews = await contentReviewService.findContentReviewById(reviewId);

      if (!reviews) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        reviews,
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),


  getTop10Reviews: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const reviews = await contentReviewService.findTop10ContentReview();

      if (!reviews) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        reviews,
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
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

  incrementViewsToReviews: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;

      const reviews = await contentReviewService.incrementViews(reviewId);

      if (!reviews) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        "ok",
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  incrementLikesToReviews: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;

      const reviews = await contentReviewService.incrementLikes(reviewId);

      if (!reviews) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        "ok",
        200,
      );
    } catch (err) {
      const error = err as Error;

      logger.error(error.message);
      return sendError(res, createHttpError(403, error));
    }
  }),

  incrementDislikesToReviews: asyncWrapper(async (req: Request, res: Response) => {
    try {
      const { reviewId } = req.params;

      const reviews = await contentReviewService.incrementDislikes(reviewId);

      if (!reviews) {
        logger.error(messages.DATA_NOT_FOUND);
        throw createHttpError(500, messages.DATA_NOT_FOUND);
      }

      return sendResponse(
        res,
        "ok",
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