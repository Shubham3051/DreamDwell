import { useState, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
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

  // filter chats
  const filteredChats = chats.filter((chat) =>
    chat.name.toLowerCase().includes(search.toLowerCase())
  );

  // avatar initials
  const getInitials = (name) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="h-full flex flex-col bg-white">

      {/* HEADER */}
      <div className="p-4 border-b border-[#E6D5C3]">
        <h2 className="font-bold text-[#1C1B1A] text-lg">Messages</h2>

        {/* Search */}
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search chats..."
          className="mt-3 w-full px-3 py-2 text-sm border border-[#E6D5C3] rounded-xl outline-none focus:border-[#D4755B] focus:ring-2 focus:ring-[#D4755B]/10"
        />
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        {filteredChats.length === 0 && (
          <div className="p-4 text-sm text-gray-400">
            No chats found
          </div>
        )}

        {filteredChats.map((chat) => {
          const isActive = activeChat?.id === chat.id;

          return (
            <div
              key={chat.id}
              onClick={() => setActiveChat(chat)}
              className={`
                flex items-center gap-3 p-4 cursor-pointer
                border-b border-[#F5F1E8]
                transition-all duration-200
                hover:bg-[#FAF8F4]
                ${isActive ? "bg-[#F5F1E8]" : ""}
              `}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-full bg-[#D4755B] text-white flex items-center justify-center font-semibold text-sm">
                {getInitials(chat.name)}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#1C1B1A] truncate">
                    {chat.name}
                  </h3>

                  {/* unread badge */}
                  {chat.unread > 0 && (
                    <span className="ml-2 bg-[#D4755B] text-white text-xs px-2 py-0.5 rounded-full">
                      {chat.unread}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#5A5856] truncate mt-0.5">
                  {chat.lastMessage}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatSidebar;