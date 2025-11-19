import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./config/db.js";
import app from "./app.js";
import { createServer } from "http";
import { Server } from "socket.io";
import { socketHandler } from "./socket/socketHandler.js";

const PORT = process.env.PORT || 5000;

connectDB();

// HTTP server
const httpServer = createServer(app);

// Socket.io server
const io = new Server(httpServer, {
  cors: {
    origin: "*",
  }
});

socketHandler(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
