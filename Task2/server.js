import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";

dotenv.config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// DB connection
connectDB();

// routes
app.use("/tasks", taskRoutes);

// server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
