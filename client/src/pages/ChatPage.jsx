import ChatSidebar from "../components/chat/ChatSidebar";
import ChatWindow from "../components/chat/ChatWindow";
import Navbar from "../components/common/Navbar";

const ChatPage = () => {
  return (
  <div>
    <Navbar />
    <div className="h-screen flex bg-[#FAF8F4]">
      {/* LEFT - chat list */}
      <div className="w-1/3 border-r border-[#E6D5C3] bg-white">
        <ChatSidebar />
      </div>

      {/* RIGHT - active chat */}
      <div className="flex-1">
        <ChatWindow />
      </div>
    </div>
  </div>
  );
};

export default ChatPage;