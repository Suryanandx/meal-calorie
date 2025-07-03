import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import statusRoutes from "./routes/status.route";
import authRoutes from "./routes/auth.route";
import calorieRoutes from "./routes/calories.route";

dotenv.config();

const app = express();

// ✅ Allow all origins (public API)
app.use(cors());

// Optional: allow preflight across all routes
app.options('*', cors());

// JSON parsing middleware
app.use(express.json());

// Routes
app.use("/status", statusRoutes);
app.use("/auth", authRoutes);
app.use("/", calorieRoutes);

export default app;
