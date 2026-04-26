import Message from "../models/Message.js";
import User from "../models/User.js";

// GET CHAT HISTORY
export const getMessages = async (req, res) => {
  try {
    const user1 = req.userId; // auth middleware assigns this
    const user2 = req.params.userId;

    const messages = await Message.find({
      $or: [
        { senderId: user1, receiverId: user2 },
        { senderId: user2, receiverId: user1 },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET CHAT LIST (Unique users chatted with)
export const getChatList = async (req, res) => {
  try {
    const userId = req.userId;

    // Find all messages involving the current user
    const messages = await Message.find({
      $or: [{ senderId: userId }, { receiverId: userId }],
    }).sort({ createdAt: -1 }).populate("senderId receiverId", "name email role");

    // Extract unique users
    const chatUsersMap = new Map();

    messages.forEach((msg) => {
      // Find the "other" user
      const isSender = msg.senderId._id.toString() === userId.toString();
      const otherUser = isSender ? msg.receiverId : msg.senderId;

      if (!chatUsersMap.has(otherUser._id.toString())) {
        chatUsersMap.set(otherUser._id.toString(), {
          id: otherUser._id,
          name: otherUser.name,
          role: otherUser.role,
          lastMessage: msg.message,
          unread: 0, // In future, check msg.read status
          timestamp: msg.createdAt,
        });
      }
    });

    res.json(Array.from(chatUsersMap.values()));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};