import { useState } from "react";
import { useChat } from "../../context/ChatContext";

const MessageInput = () => {
  const [text, setText] = useState("");
  const { socket, activeChat, currentUser } = useChat();

  const sendMessage = () => {
    if (!text.trim()) return;

    const msg = {
      senderId: currentUser._id,
      receiverId: activeChat.id,
      message: text,
    };

    socket.emit("send_message", msg);

    setText("");
  };

  return (
    <div className="p-4 border-t border-[#E6D5C3] bg-white flex gap-2">
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 border border-[#E6D5C3] rounded-xl outline-none focus:border-[#D4755B]"
      />

      <button
        onClick={sendMessage}
        className="bg-[#D4755B] text-white px-4 py-2 rounded-xl hover:bg-[#C05E44]"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;