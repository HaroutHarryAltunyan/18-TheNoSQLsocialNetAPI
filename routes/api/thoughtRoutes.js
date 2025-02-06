const express = require("express");
const Thought = require("../../models/Thought");
const User = require("../../models/User");

const router = express.Router();

/**
 * @route   GET /api/thoughts
 * @desc    Get all thoughts
 */
router.get("/", async (req, res) => {
  try {
    const thoughts = await Thought.find().populate("reactions");
    res.status(200).json(thoughts);
  } catch (err) {
    console.error("Error fetching thoughts:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route   GET /api/thoughts/:id
 * @desc    Get a single thought by ID
 */
router.get("/:id", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate("reactions");

    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.status(200).json(thought);
  } catch (err) {
    console.error("Error fetching thought:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route   POST /api/thoughts
 * @desc    Create a new thought and associate it with a user
 */
router.post("/", async (req, res) => {
  const { thoughtText, userId } = req.body;

  if (!thoughtText || !userId) {
    return res.status(400).json({ error: "Both thoughtText and userId are required" });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newThought = await Thought.create({ thoughtText, username: user.username });

    // Adds the thought to the user's list
    user.thoughts.push(newThought._id);
    await user.save();

    res.status(201).json(newThought);
  } catch (err) {
    console.error("Error creating thought:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route   PUT /api/thoughts/:id
 * @desc    Update a thought by ID
 */
router.put("/:id", async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensures validation rules apply
    });

    if (!updatedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.status(200).json(updatedThought);
  } catch (err) {
    console.error("Error updating thought:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route   DELETE /api/thoughts/:id
 * @desc    Delete a thought by ID
 */
router.delete("/:id", async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    if (!deletedThought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.status(200).json({ message: "Thought successfully deleted" });
  } catch (err) {
    console.error("Error deleting thought:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route   POST /api/thoughts/:thoughtId/reactions
 * @desc    Add a reaction to a thought
 */
router.post("/:thoughtId/reactions", async (req, res) => {
  try {
    const { reactionBody, username } = req.body;
    
    if (!reactionBody || !username) {
      return res.status(400).json({ error: "Both reactionBody and username are required" });
    }

    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $addToSet: { reactions: req.body } },
      { new: true }
    );

    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    res.status(201).json(thought);
  } catch (err) {
    console.error("Error adding reaction:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

/**
 * @route   DELETE /api/thoughts/:thoughtId/reactions/:reactionId
 * @desc    Remove a reaction from a thought
 */
router.delete("/:thoughtId/reactions/:reactionId", async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);

    if (!thought) {
      return res.status(404).json({ error: "Thought not found" });
    }

    thought.reactions = thought.reactions.filter(
      (reaction) => reaction._id.toString() !== req.params.reactionId
    );

    await thought.save();

    res.status(200).json({ message: "Reaction removed successfully", thought });
  } catch (err) {
    console.error("Error removing reaction:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
