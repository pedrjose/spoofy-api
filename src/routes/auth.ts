import { Router } from "express";

import { validators } from "../middlewares/validators";
import { authVerifier } from "../middlewares/authVerificator";
import { authController } from "../controllers";
import { multerUploader } from "../middlewares/multerUpload";

const router = Router();

router.post("/login", validators.loginValidationRules, validators.validate, authController.login);

router.post( "/register", validators.registerValidationRules, validators.validate, authController.register);

router.post("/refresh", authVerifier.verifyRefreshToken, authController.refreshToken);

router.post("/logout", authVerifier.verifyAccessToken, authController.logout);

router.get("/profile", authVerifier.verifyAccessToken, authController.getProfile);

router.patch("/profile", authVerifier.verifyAccessToken, authController.updateProfile);

router.patch("/profile/photo", authVerifier.verifyAccessToken, multerUploader.uploaderMiddleware, authController.updatePerfilImage);

export default router;