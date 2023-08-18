import mongoose from "mongoose";

export const connectDatabase = () => {
  console.log("Searching for connection via mongoose!");

  mongoose
    .connect(`${process.env.MONGO_URI}`)
    .then(() => console.log("Database MongoDB Atlas Working!"))
    .catch((error) => console.log(error));
};