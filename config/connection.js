const mongoose = require("mongoose");
require("dotenv").config();

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialnetdb";

// MongoDB Connection
mongoose
  .connect(mongoUri, {
    useNewUrlParser: true, // Ensures proper parsing of MongoDB connection string
    useUnifiedTopology: true, // Helps with server discovery and monitoring
  })
  .then(() => console.log("✅ Successfully connected to MongoDB"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1); // Exit process if unable to connect
  });

// Handle disconnection errors
mongoose.connection.on("error", (err) => {
  console.error("⚠️ MongoDB encountered an error:", err);
});

// Graceful shutdown for MongoDB connection
process.on("SIGINT", async () => {
  console.log("\n🔴 Closing MongoDB connection...");
  await mongoose.connection.close();
  console.log("🛑 MongoDB connection closed. Exiting process.");
  process.exit(0);
});

module.exports = mongoose.connection;