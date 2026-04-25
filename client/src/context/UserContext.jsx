import { createContext, useState, useContext } from "react";

// Create Context
export const UserContext = createContext(null);

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({}); // ✅ fixed

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook (better name)
export const useUser = () => useContext(UserContext);