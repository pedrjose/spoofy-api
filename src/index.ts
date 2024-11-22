import cors, { CorsOptions } from 'cors';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import express from 'express';
import { connectMongoDB } from "./database/databaseConnection";
import { errorHandler } from "./helpers";

import passport from "./middlewares/passport";

import httpLogger from "./middlewares/HttpLogger";

import { loadConfigVariables } from "./config";
import redisClient from './redis/redisConnection';
import { messages } from './messages';
import routes from "./routes";

loadConfigVariables();

const allowedOrigins = [
  "http://localhost:5173",
  "https://divine-pangolin-monthly.ngrok-free.app",
];

const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, origin);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With", "Accept"],
};

(async () => {
  try {
    await connectMongoDB();

    const port = parseInt(process.env.PORT ?? "0", 10) || 3000;
    const app = express();

    app.use(cors(corsOptions));

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.use(cookieParser());

    app.options("*", cors(corsOptions));
    
    app.use(helmet());

    routes(app)

    app.use(passport);

    redisClient.ping();

    app.use(httpLogger);

    app.use((_, __, next) => next(createError(404, messages.NOT_FOUND)));

    app.use(errorHandler);

    app.listen(port, () =>
      console.log(`The Server is Hosted on Port ${port}...`)
    );
  } catch (error) {
    console.log('Failed to start the application:', error);
  }
})();





