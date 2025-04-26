import Message from "../models/messageModel.js";
import User from "../models/userModel.js"; 

export const sendMessage = async (req, res) => {
  const { sender, receiver, content, timeStamp, room } = req.body;

  try {
    if (!receiver) {
      return res.status(400).json({ success: false, message: "Receiver (patient ID) is required." });
    }

    const user = await User.findById(receiver);
    if (!user) {
      return res.status(404).json({ success: false, message: "Receiver not found." });
    }
    const newMessage = new Message({ sender, receiver: user._id, content, timeStamp, room });
    const savedMessage = await newMessage.save();

    res.status(201).json({ success: true, message: "Message sent", data: savedMessage });
  } catch (error) {
    console.error("Error sending message:", error);
    res.status(500).json({ success: false, message: "Failed to send message", error });
  }
};