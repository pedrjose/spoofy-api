import { Application } from "express";

import { config } from "../config";
import authRoutes from "./auth";
import adminRoutes from "./admin";
import protectedRoutes from "./protected";
import lyricsRoutes from "./lyrics"
import test from "./test"


const { API_VERSION } = config;

const routes = (app: Application) => {
  const apiPrefix = `/api/${API_VERSION}`;

  app.use(apiPrefix, test);

  app.use(apiPrefix, authRoutes);

  app.use(apiPrefix, protectedRoutes);

  app.use(apiPrefix, lyricsRoutes);

  app.use(`${apiPrefix}/admin`, adminRoutes);

  return app;
};

export default routes;