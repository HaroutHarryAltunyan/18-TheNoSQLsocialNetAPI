// Imports necessary models
const express = require("express");
const User = require("../../models/User");
const Thought = require("../../models/Thought");

// Creating new router instance
const router = express.Router();

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("thoughts").populate("friends");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET a single user by id with thoughts and friends
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("thoughts")
      .populate("friends");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST to create a new user with validation
router.post("/", async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const { username, email } = req.body;

    // Validate required fields
    if (!username || !email) {
      return res.status(400).json({ error: "Both username and email are required" });
    }

    // Validate email format
    if (!/.+\@.+\..+/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const newUser = await User.create({ username, email });
    res.status(201).json(newUser);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ error: err.message });
  }
});

// PUT to update a user by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensures validation runs on update
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE to remove a user by id
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Deletes thoughts associated with the user
    await Thought.deleteMany({ _id: { $in: user.thoughts } });

    res.json({ message: "User and their thoughts deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// FRIENDS ROUTE

// POST to add a new friend to user's friend list
router.post("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: "User or friend not found" });
    }

    // Adds the friend to the user's friend list
    user.friends.addToSet(friend._id); // Prevents duplicates
    await user.save();

    res.json({ message: "Friend added successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE to remove a friend from user's friend list
router.delete("/:userId/friends/:friendId", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.userId,
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Friend removed successfully", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;