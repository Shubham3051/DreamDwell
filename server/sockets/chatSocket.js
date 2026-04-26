import Message from "../models/Message.js";

const onlineUsers = new Map();

export const initChatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send_message", async (data) => {
      const { senderId, receiverId, message, propertyId } = data;

      const newMessage = await Message.create({
        senderId,
        receiverId,
        message,
        propertyId,
      });

      const receiverSocket = onlineUsers.get(receiverId);

      if (receiverSocket) {
        io.to(receiverSocket).emit("receive_message", newMessage);
      }

      socket.emit("message_sent", newMessage);
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
    });
  });
};