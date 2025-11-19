import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.log(" DB Error:", err.message);
  }
}
