import { Router } from "express";
import { authVerifier } from "../middlewares/authVerificator";
import { lyricsControllerIndex } from "../controllers";


const router = Router();

router.get(
  "/playlists",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.playlist.getPlaylists,
);

router.post(
  "/playlist/:playlistName",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.playlist.createPlaylist,
);

router.patch(
  "/playlist/lyrics",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.playlist.updateLyricToPlaylist,
);

router.delete(
  "/playlist/:playlistId",
  authVerifier.verifyAccessToken,
  lyricsControllerIndex.playlist.deletePlaylist,
);

export default router;