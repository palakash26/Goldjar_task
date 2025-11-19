import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect Database
connectDB();

// Routes
app.use("/auth", authRoutes);

// PORT
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
