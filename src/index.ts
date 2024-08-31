import cors, { CorsOptions } from 'cors';
import helmet from "helmet";
import cookieParser from "cookie-parser";
import express from 'express';
import { connectMongoDB } from "./database/databaseConnection";

import { corsAuth } from "./middlewares/CorsModdleware";
import userRoute from "./routes/user.route";

import httpLogger from "./middlewares/HttpLogger";

import { loadConfigVariables } from "./config";
import redisClient from './redis/redisConnection';

loadConfigVariables();

const allowedList = [
  "http://localhost:3000",
  "http://localhost:8000",
];

const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin: any, callback: any) => {
    if (allowedList.includes(origin ?? "") || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

(async () => {
  try {
    await connectMongoDB();

    const port = parseInt(process.env.PORT ?? "0", 10) || 3000;
    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

    app.use(cookieParser());

    app.use(cors(corsOptions));
    
    app.use(helmet());

    app.use("/user", corsAuth, userRoute);

    redisClient.ping();

    app.use(httpLogger);

    app.listen(port, () =>
      console.log(`The Server is Hosted on Port ${port}...`)
    );
  } catch (error) {
    console.log('Failed to start the application:', error);
  }
})();





