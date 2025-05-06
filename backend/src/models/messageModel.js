import mongoose from "mongoose";

const EmailSchema = mongoose.Schema({
  to: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  sentAt: { type: Date, default: Date.now },
  status: { type: String, default: 'sent' }
});
  
const Email = mongoose.model("Email", EmailSchema);
export default Email;