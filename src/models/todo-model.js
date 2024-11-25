const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({
  // * Task 1: Starts here
  title: { type: String, required: true },
  completed: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date, default: Date.now() },
  // * Task 1: Continues to user-model.js (A)
});

module.exports = mongoose.model("Todo", todoSchema);
