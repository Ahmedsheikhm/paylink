import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet"; // ✅ Added


import { router as healthRouter } from "./routes/health.route.js";
import router from "./routes/userRoutes.js";
import authRoutes from './routes/authRoutes.js';
import { requireAuth } from "./middleware/authMiddleware.js";
import walletRoutes from './routes/walletRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import { httpLogger } from "./config/logger.js";
import { apiErrorHandler } from "./middleware/errorHandler.js";

// Initialize environment variables
dotenv.config();

// Create express app
const app = express();

// Middleware
app.use(httpLogger);
app.use(express.json());
app.use(cors());
app.use(helmet()); // ✅ Security middleware
app.use(morgan("dev"));


// Routes
app.use("/api/health", healthRouter);
app.use('/api/auth', authRoutes);
app.use("/api/users", router);

//Protected Routes
app.get("/api/me",requireAuth,(req,res)=>{
  res.json({user:req.user});
})
app.use('/api/wallet',walletRoutes);
app.use('/api/transactions',transactionRoutes);


// Default route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to PayLink API 🚀" });
});
//error handler
app.use(apiErrorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});