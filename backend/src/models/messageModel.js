import mongoose from "mongoose";

const messageSchema = mongoose.Schema({
  sender: { type: String, required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  room: { type: String, default: "general" },
  isRead: { type: Boolean, default: false }  
});
  
const Message = mongoose.model("Message", messageSchema);
export default Message;