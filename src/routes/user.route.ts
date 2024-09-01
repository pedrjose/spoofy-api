import { Router } from "express";

const router = Router();

import {
  signUpController,
  loginController,
  authController,
  createPlaylistController,
  removePlaylistController,
  addLyricController,
  removeLyricController,
  findPlaylistByUserController,
  findPlaylistByIdController
} from "../controllers/userController";

router.post("/sign-up", signUpController);
router.post("/login", loginController);
router.get("/auth", authController);
router.patch("/create-playlist", createPlaylistController);
router.patch("/remove-playlist", removePlaylistController);
router.patch("/add-lyric", addLyricController);
router.patch("/remove-lyric", removeLyricController);
router.get("/find-playlist-by-user", findPlaylistByUserController);
router.get("/find-playlist-by-id", findPlaylistByIdController);

export default router;
