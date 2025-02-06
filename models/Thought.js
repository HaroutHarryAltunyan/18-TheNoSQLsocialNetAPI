const mongoose = require("mongoose");
const { Schema, Types } = mongoose;

/**
 * Schema for Reactions
 */
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(), // Generates a new ObjectId by default
    },
    reactionBody: {
      type: String,
      required: [true, "Reaction text is required"],
      maxlength: [280, "Reaction must be 280 characters or less"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(), // Formats date for better readability
    },
  },
  {
    toJSON: {
      getters: true, // Enables the getter method for timestamps
    },
    _id: false, // Disables automatic creation of _id for reactions
  }
);

/**
 * Schema for Thoughts
 */
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: [true, "Thought text is required"],
      minlength: [1, "Thought must be at least 1 character long"],
      maxlength: [280, "Thought must be 280 characters or less"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => new Date(timestamp).toLocaleString(),
    },
    username: {
      type: String,
      required: [true, "Username is required"],
    },
    reactions: [reactionSchema], // Embeds the reaction schema as an array
  },
  {
    toJSON: {
      virtuals: true, // Enables virtual fields
      getters: true, // Applies getter functions
    },
    id: false, // Removes default '_id' field when returning JSON
  }
);

/**
 * Virtual field for reaction count
 */
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

/**
 * Compiles Thought model
 */
const Thought = mongoose.model("Thought", thoughtSchema);

module.exports = Thought;