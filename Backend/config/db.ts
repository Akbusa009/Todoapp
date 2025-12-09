import mongoose from "mongoose";

const getMongoUri = (): string => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    throw new Error("MONGO_URI is not set");
  }
  return uri;
};

const connectDB = async () => {
  await mongoose.connect(getMongoUri());
  console.log("Connected to MongoDB");
};

export default connectDB;