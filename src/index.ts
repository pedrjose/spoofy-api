import express from 'express';
import { connectMongoDB } from "./database/databaseConnection";

import { corsAuth } from "./middlewares/CorsModdleware";
import userRoute from "./routes/user.route";

import httpLogger from "./middlewares/HttpLogger";
import bodyParser from "body-parser"


import { loadConfigVariables } from "./config";

loadConfigVariables();

(async () => {
  try {
    await connectMongoDB();

    const port = parseInt(process.env.PORT ?? "0", 10) || 3000;
    const app = express();

    app.use(express.json());

    app.use("/user", corsAuth, userRoute);

    app.use(httpLogger);

    app.listen(port, () =>
      console.log(`The Server is Hosted on Port ${port}...`)
    );
  } catch (error) {
    console.log('Failed to start the application:', error);
  }
})();





