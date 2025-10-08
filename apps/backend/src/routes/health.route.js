// src/routes/health.route.js
import express from "express";

export const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "PayLink API is healthy 💚",
    timestamp: new Date().toISOString(),
  });
});