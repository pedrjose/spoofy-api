import { Router } from "express";

import { authVerifier } from "../middlewares/authVerificator";
import { adminController } from "../controllers";
import { validators } from "../middlewares/validators";

const router = Router();

router.get(
  "/user/:userId",
  authVerifier.verifyAccessToken,
  authVerifier.adminOnly,
  validators.userIdValidationRule,
  validators.validate,
  adminController.getUser,
);

router.get(
  "/users",
  authVerifier.verifyAccessToken,
  authVerifier.adminOnly,
  adminController.getAllUsers,
);

router.post(
  "/createAccount",
  authVerifier.verifyAccessToken,
  authVerifier.adminOnly,
  validators.createAccountValidationRules,
  validators.validate,
  adminController.createAccount,
);

router.post(
  "/review",
  authVerifier.verifyAccessToken, 
  authVerifier.adminOnly,
  adminController.createReview,
);

router.patch(
  "/user/:userId",
  authVerifier.verifyAccessToken,
  authVerifier.adminOnly,
  validators.updateUserValidationRules,
  validators.validate,
  adminController.updateUser,
);

router.delete(
  "/user/:userId",
  authVerifier.verifyAccessToken,
  authVerifier.adminOnly,
  validators.userIdValidationRule,
  validators.validate,
  adminController.deleteUser,
);

router.delete(
  "/review/:reviewId",
  authVerifier.verifyAccessToken,
  authVerifier.adminOnly,
  validators.validate,
  adminController.deleteReview,
);

export default router;