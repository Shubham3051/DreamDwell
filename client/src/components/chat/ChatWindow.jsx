import { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import MessageInput from "./MessageInput";
import axios from "axios";

const ChatWindow = () => {
  const { activeChat, messages, setMessages, socket, currentUser } = useChat();
  const messagesEndRef = useRef(null);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch messages
  useEffect(() => {
    const fetchMessages = async () => {
      if (!activeChat) return;
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:8000/api/chat/${activeChat.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessages(res.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
    fetchMessages();
  }, [activeChat, setMessages]);

  // Socket listener
  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
      // Only append if it belongs to the current active chat
      if (
        activeChat &&
        (String(newMessage.senderId) === String(activeChat.id) ||
          String(newMessage.receiverId) === String(activeChat.id))
      ) {
        setMessages((prev) => [...prev, newMessage]);
      }
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("message_sent", handleReceiveMessage);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("message_sent", handleReceiveMessage);
    };
  }, [socket, activeChat, setMessages]);

  if (!activeChat) {
    return (
      <div className="h-full flex items-center justify-center text-[#9CA3AF]">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* HEADER */}
      <div className="p-4 border-b border-[#E6D5C3] bg-white">
        <h2 className="font-semibold text-[#1C1B1A]">
          {activeChat.name}
        </h2>
        <p className="text-xs text-[#5A5856]">
          Online chat
        </p>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4">
        {messages.length === 0 ? (
          <div className="text-sm text-[#5A5856] text-center mt-4">
            Start conversation...
          </div>
        ) : (
          messages.map((msg, index) => {
            const isMe = String(msg.senderId) === String(currentUser?._id);
            return (
              <div
                key={index}
                className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}
              >
                <div
                  className={`max-w-[70%] px-4 py-2 rounded-2xl text-sm ${
                    isMe
                      ? "bg-[#D4755B] text-white rounded-br-none"
                      : "bg-[#F5F1E8] text-[#1C1B1A] rounded-bl-none border border-[#E6D5C3]"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT */}
      <MessageInput />
    </div>
  );
};

export default ChatWindow;