import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet"; // ✅ Added

import { router as healthRouter } from "./routes/health.route.js";
import router from "./routes/userRoutes.js";

// Initialize environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet()); // ✅ Security middleware
app.use(morgan("dev"));

// Routes
app.use("/api/health", healthRouter);
app.use("/api/users", router);

// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PayLink API 🚀" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});