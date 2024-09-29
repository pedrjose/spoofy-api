import mongoose from "mongoose";

import { config, loadConfigVariables } from "../config";
import { logger } from "../helpers";

loadConfigVariables();

export const connectMongoDB = async () => {
  const { databaseUrl, databaseUser, databasePassword } = config;

  mongoose.connection
    .on("error", err => logger.error(err.message))
    .on("disconnected", connectMongoDB)
    .once("open", () => logger.info(`MongoDB connected to ${databaseUrl}`),);

  await mongoose.connect(databaseUrl);
};