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