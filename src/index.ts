import * as express from "express";
import { connectDatabase } from "./Database/databaseConnection";
import * as dotenv from "dotenv";
dotenv.config();

import { corsAuth } from "./Middlewares/CorsModdleware";
import userRoute from "./Routes/user.route";

(async () => {
  try {
    await connectDatabase();

    const port = process.env.PORT || 3000;
    const app = express();

    app.use(express.json());
    app.use("/user", corsAuth, userRoute);

    app.listen(port, () =>
      console.log(`The Server is Hosted on Port ${port}...`)
    );
  } catch (error) {
    console.log('Failed to start the application:', error);
  }
})();





