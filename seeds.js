const mongoose = require("mongoose");
const User = require("./models/User");
const Thought = require("./models/Thought");

mongoose
  .connect("mongodb://localhost/socialNetworkDB")
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("Error connecting to MongoDB: ", err));

const userData = [
  {
    username: "Alex_Rider",
    email: "alex.rider@email.com",
  },
  {
    username: "Emma_Stone",
    email: "emma.stone@email.com",
  },
  {
    username: "Liam_Walker",
    email: "liam.walker@email.com",
  },
];

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

const seedDatabase = async () => {
  try {
    // Clears existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log("Database cleared");

    // Create users
    const createdUsers = await User.create(userData);
    console.log(`Created ${createdUsers.length} users`);

    // Creates thoughts and associates with users
    for (const thought of thoughtData) {
      const user = await User.findOne({ username: thought.username });
      if (user) {
        const newThought = await Thought.create(thought);
        user.thoughts.push(newThought._id);
        await user.save();
      }
    }

    console.log("Seeded database successfully");
  } catch (err) {
    console.error("Error with seeding:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();