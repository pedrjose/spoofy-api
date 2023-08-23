import { corsAuth } from "../Middlewares/CorsModdleware";

import { Router } from "express";
const router = Router();

import {
  signUpController,
  loginController,
  authController
} from "../Controllers/user.controller";

router.post("/sign-up", corsAuth, signUpController);
router.post("/login", corsAuth, loginController);
router.get("/auth", corsAuth, authController);

export default router;