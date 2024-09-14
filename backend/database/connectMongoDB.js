import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connect to MongoDB successfully");
  } catch (error) {
    console.log("Connect to MongoDB failed", error.message);
  }
};

export default connectMongoDB;
