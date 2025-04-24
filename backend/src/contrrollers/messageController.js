import Message from "../models/messageModel.js";

export const sendMessage = async (req, res) => {
  const { sender, content, timeStamp, room } = req.body;

  try {
    const newMessage = new Message({ sender, content, timeStamp, room });
    const savedMessage = await newMessage.save();
    res.status(201).json({ success: true, message: "Message sent", data: savedMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Failed to send message", error });
  }
};
