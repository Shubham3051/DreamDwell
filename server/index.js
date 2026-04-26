import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";

import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import chatRoutes from "./routes/chatRoutes.js";
import propertyRoute from "./routes/propertyRoutes.js";
import savedRoutes from "./routes/savedRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import { initChatSocket } from "./sockets/chatSocket.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const CLIENT_URL = "http://localhost:5173";

// Middleware
app.use(express.json());
app.use(cors({
  origin: CLIENT_URL,
  credentials: true,
}));

// Routes
app.use("/user", userRoute);
app.use("/api/chat", chatRoutes);
app.use("/api/properties", propertyRoute);
app.use("/api/saved", savedRoutes);
app.use("/api/bookings", bookingRoutes);

// Create server
const server = http.createServer(app);

// Socket
const io = new Server(server, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

initChatSocket(io);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// DB + Server start
connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("DB connection failed:", err);
  });