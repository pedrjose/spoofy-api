import dotenv from "dotenv";
import { env } from "../helpers";

export const config = {
    API_VERSION: "v1",
    salt: 10,

    // jwt parameters
    refreshTokenPrivateKey: "secret",
    accessTokenPrivateKey: "secret",
    refreshTokenExpiration: "1m",
    accessTokenExpiration: "1m",

    // token parameters
    refreshTokenName: "refreshToken",
    cookieDomain: "localhost",

    // database
    databaseUrl: "mongodb://spoofy:123456@mongo:27017/spoofy",
    databaseUser: "spoofy",
    databasePassword: "123456",

    // redis
    redisUrl: "redis://redis:6379",

    // vagalume
    GeniusApiKey: "sv0ho3jVEkFFmnwuXH8qJu5lsGggcoaiB89NQXQ208VJ5DSZIEQ445BEzJ2Ya3VS",

    //Cloudinary
    CloudinaryCloudName: "dgewhwiee",
    CloudinaryApiKey: "998133269216118",
    CloudinaryApiSecrete: "XUPkvxpVu9U9MaQTnsHOyZXQLLO",
  };

export const loadConfigVariables = () => {
    dotenv.config();
    dotenv.config({ path: ".env.local" });

    config.salt = env("SALT", config.salt) as number;

     // jwt parameters
    config.refreshTokenPrivateKey = env("REFRESH_TOKEN_PRIVATE_KEY", config.refreshTokenPrivateKey) as string;
    config.accessTokenPrivateKey = env("ACCESS_TOKEN_PRIVATE_KEY", config.accessTokenPrivateKey) as string;
    config.refreshTokenExpiration = env("REFRESH_TOKEN_EXPIRATION", config.refreshTokenExpiration) as string;
    config.accessTokenExpiration = env("ACCESS_TOKEN_EXPIRATION", config.accessTokenExpiration) as string;

    // token parameters
    config.cookieDomain = env("COOKIE_DOMAIN", config.cookieDomain) as string;
    
    // redis config
    config.redisUrl = env("REDIS_URL", config.databaseUrl) as string;

    // database config
    config.databaseUrl = env("DATABASE_URL", config.databaseUrl) as string;
    config.databaseUser = env("DATABASE_USER", config.databaseUser) as string;
    config.databasePassword = env("DATABASE_PASSWORD", config.databasePassword) as string;

    // vagalume config
    config.GeniusApiKey = env("GENIUS_API_KEY", config.GeniusApiKey) as string;

    // cloudinary config
    config.CloudinaryCloudName = env("CLOUDINARY_CLOUD_NAME", config.CloudinaryCloudName) as string;
    config.CloudinaryApiKey = env("CLOUDINARY_API_KEY", config.CloudinaryApiKey) as string;
    config.CloudinaryApiSecrete = env("CLOUDINARY_API_SECRET", config.CloudinaryApiSecrete) as string;
}