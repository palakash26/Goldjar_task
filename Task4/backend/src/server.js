import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

import { connectDB } from "./config/db.js";
import messageRoutes from "./routes/messageRoutes.js";
import { socketHandler } from "./socket/socketHandler.js";

const PORT = process.env.PORT || 5000;

const app = express();

//  middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/messages", messageRoutes);

// Connect to MongoDB
connectDB();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

socketHandler(io);

//  server
httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
