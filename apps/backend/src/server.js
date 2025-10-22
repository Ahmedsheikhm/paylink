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
import { helmetMiddleware } from './config/security.js';
import { apiSlowDown, apiRateLimiter } from './middleware/rateLimiter.js';
import { enforceHttps } from "./middleware/httpsRedirect.js";

// Initialize environment variables
dotenv.config();

const createApp = ()=>{
  // Create express app
  const app = express();

  if (process.env.TRUST_PROXY) app.set('trust proxy', 1); // e.g., when behind load balancer
  app.use(enforceHttps);

  //helmet security
  app.disable('x-powered-by');
  app.use(helmetMiddleware);

  //rate limiting
  app.use(apiSlowDown);
  app.use('/api/', apiRateLimiter); // apply rate limiting to API routes

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
  return app;
};

// Only start server when run directly, not when imported by tests
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 5000;
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`✅ Server running in ${process.env.NODE_ENV} on port ${PORT}`);
  });
}

// default export for convenience
export default createApp;