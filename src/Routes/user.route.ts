import { Router } from "express";
const router = Router();

import {
  signUpController,
  loginController,
  authController
} from "../Controllers/user.controller";

router.post("/sign-up", signUpController);
router.post("/login", loginController);
router.get("/auth", authController);

export default router;
