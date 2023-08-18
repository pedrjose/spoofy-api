import * as express from "express";
import { connectDatabase } from "./Database/db";
import * as dotenv from "dotenv";
dotenv.config();

import userRoute from "./Routes/user.route";

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/user", userRoute);

connectDatabase();

app.listen(port, () =>
  console.log(`\nTHE SERVER IS HOSTED ON PORT ${port}...`)
);
