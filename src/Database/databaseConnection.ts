import mongoose from "mongoose";

export const connectDatabase = async () => {
  try {
    const mongoUri = process.env.MONGO_URI
    console.log(mongoUri)

    if (!mongoUri) {
      throw new Error("MONGO_URI is not defined");
    }    

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000, 
      socketTimeoutMS: 45000,
    });

    console.log("Connection established successfully!");
  } catch (error) {
    console.error("Error connecting to Database:", error);
    process.exit(1);
  }
};