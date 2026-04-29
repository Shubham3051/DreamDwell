// import { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const AuthContext = createContext();

// const API = "http://localhost:8000/api/auth";

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



// import { createContext, useState, useEffect } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // 🔄 Load user safely from localStorage
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     const storedToken = localStorage.getItem("token");

//     // Self-heal corrupted token 
//     if (storedToken === "undefined" || storedToken === "null") {
//       localStorage.removeItem("token");
//     }

//     try {
//       if (storedUser && storedUser !== "undefined") {
//         setUser(JSON.parse(storedUser));
//       } else {
//         localStorage.removeItem("user");
//         setUser(null);
//       }
//     } catch (error) {
//       console.log("Invalid user in localStorage, clearing it...");
//       localStorage.removeItem("user");
//       setUser(null);
//     }

//     setLoading(false);
//   }, []);

//   // ✅ Login (store safely)
//   const login = (userData) => {
//     if (!userData) return;
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   // 🚪 Logout
//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };




// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔄 INIT AUTH
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token || token === "undefined" || token === "null") {
        logout();
        setLoading(false);
        return;
      }

      try {
        const res = await api.get("/user/me");
        setUser(res.data.user);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // 🔐 LOGIN
  const login = async (formData) => {
    try {
      const res = await api.post("/user/login", formData);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      setUser(user);

      return { success: true, user };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // 📝 REGISTER
  const register = async (formData) => {
    try {
      const res = await api.post("/user/register", formData);

      // ✅ store email for verification page
      sessionStorage.setItem("verifyEmail", formData.email);

      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Register failed",
      };
    }
  };

  // 📩 FORGOT PASSWORD (send OTP)
  const forgotPassword = async (email) => {
    try {
      const res = await api.post("/user/forgot-password", { email });

      // store email for OTP page
      sessionStorage.setItem("resetEmail", email);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to send OTP",
      };
    }
  };

  // 🔢 VERIFY OTP
  const verifyOTP = async (otp) => {
    try {
      const email = sessionStorage.getItem("resetEmail");

      const res = await api.post("/user/verify-otp", {
        email,
        otp,
      });

      // ✅ store reset token (recommended)
      if (res.data.resetToken) {
        sessionStorage.setItem("resetToken", res.data.resetToken);
      }

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "OTP verification failed",
      };
    }
  };

  // 🔁 RESEND OTP
  const resendOTP = async () => {
    try {
      const email = sessionStorage.getItem("resetEmail");

      await api.post("/user/forgot-password", { email });

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: "Failed to resend OTP",
      };
    }
  };

  // 🔑 RESET PASSWORD
  const resetPassword = async (newPassword) => {
    try {
      const token = sessionStorage.getItem("resetToken");

      const res = await api.post("/user/reset-password", {
        token,
        newPassword,
      });

      // cleanup
      sessionStorage.removeItem("resetEmail");
      sessionStorage.removeItem("resetToken");

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Reset failed",
      };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,

        // auth
        login,
        register,
        logout,

        // password flow
        forgotPassword,
        verifyOTP,
        resendOTP,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// hook
export const useAuth = () => useContext(AuthContext);