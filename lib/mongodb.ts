import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    console.log("db conected");
  } catch (error) {
    console.log("error connect db ", error);
  }
};
