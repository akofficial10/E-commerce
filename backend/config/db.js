import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
    });
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
  
  }
};

export default connectDB;


