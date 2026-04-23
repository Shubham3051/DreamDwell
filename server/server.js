import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
// import authRoutes from "./routes/authRoutes.js";
// import propertyRoutes from "./routes/propertyRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

app.use("/user", userRoute);

app.use(cors());
app.use(express.json());

connectDB();

// app.use("/api/auth", authRoutes);
// app.use("/api/properties", propertyRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));