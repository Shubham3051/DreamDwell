// src/services/api.js
import axios from "axios";

// ✅ base URL from env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8000",
  withCredentials: true, // optional (for cookies if needed)
});

// 🔐 REQUEST INTERCEPTOR (attach token)
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token && token !== "undefined" && token !== "null") {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🚨 RESPONSE INTERCEPTOR (handle auth errors globally)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;

    // 🔥 auto logout if token expired
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // optional: redirect to login
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default api;