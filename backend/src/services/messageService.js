socket.on('sendMessage', async (messageData) => {
    const { sender, content, room } = messageData;
    const newMessage = new Message({ sender, content, room });
    await newMessage.save();
    io.to(room).emit('receiveMessage', newMessage);  
});
