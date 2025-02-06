const express = require("express");
const db = require("./config/connection"); // MongoDB connection
const routes = require("./routes");

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

// Database connection and server start
db.once("open", () => {
  console.log("✅ Successfully connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`🚀 API server running at http://localhost:${PORT}`);
  });
});

// Handle MongoDB connection errors
db.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

// Graceful shutdown on process termination
process.on("SIGINT", async () => {
  console.log("\n🔴 Shutting down server...");
  await db.close();
  console.log("🛑 MongoDB connection closed.");
  process.exit(0);
});