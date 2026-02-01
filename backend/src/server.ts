import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import pool from "./config/db";

const PORT = process.env.PORT || 5000;

/**
 * -------------------
 * Server Startup
 * -------------------
 */
const startServer = async () => {
  try {
    // Test DB connection before starting server
    await pool.query("SELECT 1");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
