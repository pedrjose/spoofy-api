import dotenv from "dotenv";
import { env } from "../helpers";

export const config = {
    API_VERSION: "v1",
  
    // database
    databaseUrl: "mongodb://authusers:123456@mongo:27017/authusers",
    databaseUser: "authusers",
    databasePassword: "123456",
  };

export const loadConfigVariables = () => {
    dotenv.config();
    dotenv.config({ path: ".env.local" });

    config.databaseUrl = env("DATABASE_URL", config.databaseUrl) as string;
    config.databaseUser = env("DATABASE_USER", config.databaseUser) as string;
    config.databasePassword = env("DATABASE_PASSWORD", config.databasePassword) as string;
}