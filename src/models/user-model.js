const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
    trim: true,
    unique: true,
    maxLength: 15,
  },
  name: {
    type: String,
    maxLength: 20,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  // * Task 1: Continues here from todo-model.js (A)

  
  // * Task 1: Ends here
});

module.exports = mongoose.model("User", userSchema);
