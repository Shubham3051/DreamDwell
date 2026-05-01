import { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import { Search, CheckCheck } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

const ChatSidebar = () => {
  const { setActiveChat, activeChat } = useChat();
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8000/api/chat/list", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setChats(res.data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };
    fetchChats();
  }, []);

  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name) =>
    name?.split(" ").map((n) => n[0]).join("").toUpperCase() || "??";

  return (
    <div className="h-full flex flex-col bg-white border-r border-gray-100">
      
      {/* HEADER SECTION */}
      <div className="p-6 border-b border-gray-50">
        <h2 className="text-xl font-black uppercase tracking-tighter italic text-[#1C1B1A] mb-4">
          Messages
        </h2>
        
        {/* Search Container */}
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#D4755B] transition-colors" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search conversations..."
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF8F4] border border-transparent rounded-xl text-sm outline-none focus:bg-white focus:border-[#D4755B]/30 focus:ring-4 focus:ring-[#D4755B]/5 transition-all placeholder:text-gray-400 font-medium"
          />
        </div>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto no-scrollbar">
        {filteredChats.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-300">
              No threads found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredChats.map((chat) => {
              const isActive = activeChat?.id === chat.id;

              return (
                <div
                  key={chat.id}
                  onClick={() => setActiveChat(chat)}
                  className={`
                    relative flex items-center gap-4 p-5 cursor-pointer transition-all duration-300 group
                    ${isActive ? "bg-[#FAF8F4]" : "hover:bg-gray-50/80"}
                  `}
                >
                  {/* Selection Indicator */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-[#D4755B] rounded-r-full" />
                  )}

                  {/* Avatar: Square-ish Geometry */}
                  <div className="relative shrink-0">
                    <div className={`
                      w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm transition-transform duration-500 group-hover:scale-105
                      ${isActive ? "bg-[#1C1B1A] text-white" : "bg-[#FAF8F4] text-[#D4755B] border border-gray-100"}
                    `}>
                      {getInitials(chat.name)}
                    </div>
                    {/* Status Dot */}
                    <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full shadow-sm" />
                  </div>

                  {/* Chat Metadata */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-sm font-black tracking-tight uppercase truncate ${isActive ? "text-[#1C1B1A]" : "text-gray-700"}`}>
                        {chat.name}
                      </h3>
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">
                        12:45 PM
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className={`text-xs truncate max-w-[180px] ${chat.unread > 0 ? "font-bold text-[#1C1B1A]" : "text-gray-400 font-medium"}`}>
                        {chat.lastMessage}
                      </p>

                      {chat.unread > 0 && (
                        <span className="shrink-0 ml-2 bg-[#D4755B] text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-lg shadow-lg shadow-[#D4755B]/20">
                          {chat.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatSidebar;