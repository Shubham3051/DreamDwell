import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
    <ToastContainer />
  </AuthProvider>
);