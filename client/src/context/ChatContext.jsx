import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket/socket";
import { AuthContext } from "./AuthContext";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  const [activeChat, setActiveChat] = useState(null);
  const [messages, setMessages] = useState([]);

  // connect socket once user is set
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
  }, [user]);

  useEffect(() => {
    if (!currentUser) return;

    socket.connect();

    socket.emit("join", currentUser._id);

    return () => {
      socket.disconnect();
    };
  }, [currentUser]);

  return (
    <ChatContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        activeChat,
        setActiveChat,
        messages,
        setMessages,
        socket,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);