import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import statusRoutes from "./routes/status.route";
import authRoutes from "./routes/auth.route";
import calorieRoutes from "./routes/calories.route";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000', 
  })
);

app.use(express.json());

// Routes
app.use("/status", statusRoutes);
app.use("/auth", authRoutes);
app.use("/", calorieRoutes);

export default app;
