import { Router } from "express";

import { authVerifier } from "../middlewares/authVerificator";
import { protectedController } from "../controllers";

const router = Router();

router.get("/protected", authVerifier.verifyAccessToken, protectedController.protected);

router.get(
  "/adminProtected",
  authVerifier.verifyAccessToken,
  authVerifier.adminOnly,
  protectedController.adminProtected,
);

export default router;