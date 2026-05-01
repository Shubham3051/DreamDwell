import { useEffect, useRef } from "react";
import { useChat } from "../../context/ChatContext";
import MessageInput from "./MessageInput";
import { Phone, Video, MoreHorizontal, Shield } from "lucide-react";
import axios from "axios";

const ChatWindow = () => {
  const { activeChat, messages, setMessages, socket, currentUser } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (newMessage) => {
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
      <div className="h-full flex flex-col items-center justify-center bg-[#FAF8F4] p-12 text-center">
        <div className="w-20 h-20 bg-white rounded-[2rem] flex items-center justify-center shadow-xl shadow-[#D4755B]/10 mb-6 rotate-3">
          <Shield size={32} className="text-[#D4755B]" />
        </div>
        <h2 className="text-xl font-black uppercase italic tracking-tighter text-[#1C1B1A] mb-2">
          Secure <span className="text-[#D4755B]">Inquiry</span>
        </h2>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest max-w-[240px] leading-relaxed">
          Select a resident or agent to view verified conversation history
        </p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-[#FAF8F4]">
      {/* HEADER - Editorial Style */}
      <div className="px-8 py-5 border-b border-[#1C1B1A]/5 bg-white flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-[#1C1B1A] rounded-2xl flex items-center justify-center text-white text-xs font-black shadow-lg shadow-black/10">
            {activeChat.name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-tight text-[#1C1B1A]">
              {activeChat.name}
            </h2>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Active Channel
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 text-gray-400 hover:text-[#D4755B] transition-colors"><Phone size={18} /></button>
          <button className="p-2 text-gray-400 hover:text-[#D4755B] transition-colors"><Video size={18} /></button>
          <div className="w-px h-4 bg-gray-200 mx-1" />
          <button className="p-2 text-gray-400 hover:text-[#1C1B1A] transition-colors"><MoreHorizontal size={18} /></button>
        </div>
      </div>

      {/* MESSAGES - Architectural Flow */}
      <div className="flex-1 px-8 py-6 overflow-y-auto space-y-6 no-scrollbar">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 opacity-40">
            <div className="h-px w-12 bg-[#D4755B] mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1C1B1A]">
              Establish Connection
            </p>
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
                  className={`max-w-[75%] md:max-w-[60%] px-5 py-3.5 rounded-2xl text-sm font-medium leading-relaxed shadow-sm transition-all ${
                    isMe
                      ? "bg-[#D4755B] text-white rounded-br-none shadow-[#D4755B]/20"
                      : "bg-white text-[#1C1B1A] rounded-bl-none border border-[#1C1B1A]/5"
                  }`}
                >
                  {msg.message}
                </div>
                <span className={`text-[8px] font-black uppercase tracking-widest text-gray-300 mt-2 px-1 ${isMe ? "text-right" : "text-left"}`}>
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* INPUT CONTAINER */}
      <div className="p-6 bg-white border-t border-[#1C1B1A]/5">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatWindow;