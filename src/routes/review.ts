import { Router } from "express";

import { authVerifier } from "../middlewares/authVerificator";
import { lyricsControllerIndex } from "../controllers";


const router = Router();

router.get("/reviews", authVerifier.verifyAccessToken, lyricsControllerIndex.reviews.getAllReviewsWithPagination);

router.get("/reviews/top", authVerifier.verifyAccessToken, lyricsControllerIndex.reviews.getTop10Reviews);

router.get("/review/:reviewId", authVerifier.verifyAccessToken, lyricsControllerIndex.reviews.getReviewById);

router.post("/review", authVerifier.verifyAccessToken, lyricsControllerIndex.reviews.createReview);

router.post("/review/views/:reviewId", authVerifier.verifyRefreshToken, lyricsControllerIndex.reviews.incrementViewsToReviews);

router.post("/review/like/:reviewId", authVerifier.verifyAccessToken, lyricsControllerIndex.reviews.incrementLikesToReviews);

router.post("/review/dislike/:reviewId", authVerifier.verifyAccessToken, lyricsControllerIndex.reviews.incrementDislikesToReviews);

export default router;