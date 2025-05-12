import Message from "../models/messageModel.js";

// export const getSingleMessageService = async (req, res) => {
//   const messageId = req.params.id;
//   const receiverId = req.user._id; 
//   console.log("User data:", req.user);
//     console.log("Receiver ID:", receiverId)
//   try {
//     const message = await Message.findById(messageId);

//     if (!message) {
//       return res.status(404).json({ success: false, message: "Message not found" });
//     }

//     if (message.receiver.toString() !== receiverId.toString()) {
//       return res.status(403).json({ success: false, message: "You are not authorized to view this message" });
//     }

//     message.isRead = true;
//     await message.save();

//     res.status(200).json({ success: true, message: "Message retrieved", data: message });
//   } catch (error) {
//     console.error("Error fetching message:", error);
//     res.status(500).json({ success: false, message: "Failed to fetch message", error });
//   }
// };
// ../services/getSimgleMessage.js

export const getSingleMessageService = async (req, res) => {
  const messageId = req.params.id;
  const receiverId = req.user._id;

  const adminUserId = "admin"; 

  console.log("User data:", req.user);
  console.log("Receiver ID:", receiverId);
  console.log("Message ID:", messageId);

  try {
    const message = await Message.findOne({
      _id: messageId,
      receiver: receiverId,
      sender: adminUserId, 
    });

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found or you are not authorized to view it.",
      });
    }

    message.isRead = true;
    await message.save();

    res
      .status(200)
      .json({ success: true, message: "Message retrieved", data: message });
  } catch (error) {
    console.error("Error fetching message:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch message", error });
  }
};

export const getAllMessage = async (req, res) =>{
    try {
        const messages = await Message.find({});
        res.status(200).json({ success: true, data: messages, message: "Message retrieved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error receiving message", error: error });
    }
}

export const getUnreadMessagesCount = async (req, res) => {
    try {
        const count = await Message.countDocuments({ isRead: false });
        res.status(200).json({ success: true, count });
    } catch (error) {
        console.error("Error fetching unread message count:", error);
        res.status(500).json({ success: false, message: "Failed to fetch unread message count", error });
    }
};
