import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  try {
    const { sender, content, room } = req.body;

    if (!sender || !content || !room) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMessage = new Message({ sender, content, room });
    const savedMessage = await newMessage.save();

    res.status(201).json({ message: "Message sent", data: savedMessage });
  } catch (error) {
    console.error("Send message error:", error);
    res.status(500).json({ message: "Error sending message" });
  }
};
