import { Router } from "express";
const router = Router();

import {
  signUpController,
  loginController,
  authController,
  createPlaylistController
} from "../Controllers/user.controller";

router.post("/sign-up", signUpController);
router.post("/login", loginController);
router.get("/auth", authController);
//
router.patch("/create-playlist", createPlaylistController);
router.post("/remove-playlist", authController);
router.post("/add-lyric", authController);
router.post("/remove-lyric", authController);

export default router;
