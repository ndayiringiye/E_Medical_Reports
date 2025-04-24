import Message from "../models/messageModel.js"
export const getSingleMessageService = async (req , res) =>{
    const {id} = req.params;
    console.log(`Looking for message with ID: ${id}`); 
    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }
        res.status(200).json({ success: true, data: message, message: "Message retrieved successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error receiving message", error: error });
    }
}
