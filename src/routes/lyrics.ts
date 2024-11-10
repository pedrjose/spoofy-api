import { Router } from "express";

import { authVerifier } from "../middlewares/authVerificator";
import { lyricsControllerIndex } from "../controllers";


const router = Router();

router.get(
  "/lyrics",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.lyrics.getLyrics,
);

router.delete(
  "/lyrics/:playlistId/:lyricId",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.lyrics.deleteLyricToPlaylist,
);

export default router;