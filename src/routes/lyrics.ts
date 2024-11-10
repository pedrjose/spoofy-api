import { Router } from "express";

import { authVerifier } from "../middlewares/authVerificator";
import { lyricsControllerIndex } from "../controllers";


const router = Router();

router.get(
  "/lyric",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.lyrics.getLyrics,
);

router.get(
  "/lyric/:lyricId",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.lyrics.getLyricsById,
);

router.delete(
  "/lyric/:playlistId/:lyricId",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.lyrics.deleteLyricToPlaylist,
);

export default router;