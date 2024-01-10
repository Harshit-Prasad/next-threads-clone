import mongoose from "mongoose";

export async function connectDB() {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected 200🟢");
    });

    connection.on("error", () => {
      console.log("MongoDB connection error.");
      console.log("Make sure MongoDB is running 500🔴");
    });
  } catch (error: any) {
    console.log("Something went wrong 400🔴");
    throw new Error("Something went wrong 400🔴: " + error.message);
  }
}
