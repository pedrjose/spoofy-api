import lyricsController from './lyricsController';
import playlistController from './playlistController';
import reviewController from './reviewController';

const lyricsControllerIndex = {
  lyrics: lyricsController,
  playlist: playlistController,
  reviews: reviewController
};

export default lyricsControllerIndex;