import { Router } from "express";
import { authVerifier } from "../middlewares/authVerificator";
import { playlistController } from "../controllers";


const router = Router();

router.get(
  "/playlists",
  authVerifier.verifyAccessToken,
  playlistController.playlist.getPlaylists,
);

router.post(
  "/playlist/:playlistName",
  authVerifier.verifyAccessToken,
  playlistController.playlist.createPlaylist,
);

router.patch(
  "/playlist/lyrics",
  authVerifier.verifyAccessToken,
  playlistController.playlist.updateLyricToPlaylist,
);

router.delete(
  "/playlist/:playlistId",
  authVerifier.verifyAccessToken,
  playlistController.playlist.deletePlaylist,
);

export default router;