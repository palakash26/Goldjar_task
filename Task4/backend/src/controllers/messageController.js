import { Message } from "../models/messageModel.js";

export async function getMessages(req, res) {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
}
