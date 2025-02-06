const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");
const Thought = require("./models/Thought");

// Load environment variables
dotenv.config();

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/socialNetworkDB";

// Connect to MongoDB
mongoose
  .connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Sample user data
const userData = [
  { username: "Alex_Rider", email: "alex.rider@email.com" },
  { username: "Emma_Stone", email: "emma.stone@email.com" },
  { username: "Liam_Walker", email: "liam.walker@email.com" },
];

// Sample thoughts with reactions
const thoughtData = [
  {
    thoughtText: "Just completed my first full-stack project! Feeling accomplished! 🚀",
    username: "Alex_Rider",
    reactions: [{ reactionBody: "That's fantastic! Keep going! 🎉", username: "Liam_Walker" }],
  },
  {
    thoughtText: "Visited the Grand Canyon today! The views were absolutely surreal! 🏜️",
    username: "Emma_Stone",
    reactions: [{ reactionBody: "Wow, that must have been incredible!", username: "Alex_Rider" }],
  },
  {
    thoughtText: "Deep in thought today... What truly defines happiness? 🤔",
    username: "Liam_Walker",
    reactions: [{ reactionBody: "A question for the ages. Keep searching! 🌟", username: "Emma_Stone" }],
  },
];

// Function to seed the database
const seedDatabase = async () => {
  try {
    console.log("🗑️ Clearing existing database...");
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("✅ Database cleared.");

    console.log("👤 Creating users...");
    const createdUsers = await User.insertMany(userData);
    console.log(`✅ ${createdUsers.length} users created.`);

    console.log("💭 Creating thoughts...");
    const thoughtsWithUsers = await Promise.all(
      thoughtData.map(async (thought) => {
        const user = await User.findOne({ username: thought.username });
        if (user) {
          const newThought = await Thought.create(thought);
          user.thoughts.push(newThought._id);
          await user.save();
          return newThought;
        }
        return null;
      })
    );

    console.log(`✅ ${thoughtsWithUsers.filter(Boolean).length} thoughts added.`);

    console.log("🎉 Database successfully seeded!");
  } catch (err) {
    console.error("❌ Seeding error:", err);
  } finally {
    console.log("🔌 Closing MongoDB connection...");
    mongoose.connection.close();
  }
};

// Run the seeder
seedDatabase();