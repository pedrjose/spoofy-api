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
router.post("/create-playlist", authController);
router.post("/remove-playlist", authController);
router.post("/add-lyric", authController);
router.post("/remove-lyric", authController);

export default router;
