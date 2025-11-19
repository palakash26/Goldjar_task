import { Message } from "../models/messageModel.js";

export function socketHandler(io) {
  io.on("connection", (socket) => {
    console.log("🔌 New client connected:", socket.id);

    socket.on("send_message", async (data) => {
      const msg = await Message.create({
        username: data.username,
        text: data.text
      });

      io.emit("new_message", msg);
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });
}
