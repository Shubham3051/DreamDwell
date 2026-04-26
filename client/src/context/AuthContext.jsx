// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const API = "http://localhost:5000/api/auth";

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   //  Load user from localStorage on refresh
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//     setLoading(false);
//   }, []);

//   //  Register
//   const register = async (formData) => {
//     try {
//       const res = await axios.post(`${API}/register`, formData);

//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));

//       return { success: true };
//     } catch (err) {
//       return {
//         success: false,
//         message: err.response?.data?.message || "Registration failed",
//       };
//     }
//   };

//   //  Login
//   const login = async (formData) => {
//     try {
//       const res = await axios.post(`${API}/login`, formData);

//       setUser(res.data);
//       localStorage.setItem("user", JSON.stringify(res.data));

//       return { success: true };
//     } catch (err) {
//       return {
//         success: false,
//         message: err.response?.data?.message || "Login failed",
//       };
//     }
//   };

//   //  Logout
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         loading,
//         register,
//         login,
//         logout,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };



import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 Load user safely from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // Self-heal corrupted token 
    if (storedToken === "undefined" || storedToken === "null") {
      localStorage.removeItem("token");
    }

    try {
      if (storedUser && storedUser !== "undefined") {
        setUser(JSON.parse(storedUser));
      } else {
        localStorage.removeItem("user");
        setUser(null);
      }
    } catch (error) {
      console.log("Invalid user in localStorage, clearing it...");
      localStorage.removeItem("user");
      setUser(null);
    }

    setLoading(false);
  }, []);

  // ✅ Login (store safely)
  const login = (userData) => {
    if (!userData) return;
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};