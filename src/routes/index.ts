import { Application } from "express";

import { config } from "../config";
import authRoutes from "./auth";
import adminRoutes from "./admin";
import lyricsRoutes from "./lyrics";
import playlistRoutes from "./playlists";
import reviewRoutes from "./review";



const { API_VERSION } = config;

const routes = (app: Application) => {
  const apiPrefix = `/api/${API_VERSION}`;

  app.use(apiPrefix, authRoutes);

  app.use(apiPrefix, lyricsRoutes);

  app.use(apiPrefix, playlistRoutes);

  app.use(apiPrefix, reviewRoutes);

  app.use(`${apiPrefix}/admin`, adminRoutes);

  return app;
};

export default routes;