const Todo = require("../models/todo-model");
const User = require("../models/user-model");

// * ************************************************
// * Create a user controller
// * ************************************************
exports.createUser = async (req, res, next) => {
  const { username, name } = req.body;
  try {
    const newUser = await new User({
      username,
      name,
    }).save();

    return res.status(201).json({
      message: `New user created: ${username}`,
      data: {
        userId: newUser["_id"],
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      error.message = "Username already taken!";
      error.code = 400;
    }
    next(error);
  }
};

// * ************************************************
// * Get user detail contoller
// * ************************************************
exports.getUserDetails = async (req, res, next) => {
  const username = req.params.username;
  try {
    const foundUser = await User.findOne({ username }, { todos: 0 });
    if (!foundUser) {
      let error = new Error(`User not found with id: ${id}`);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      message: "User found",
      data: foundUser,
    });
  } catch (error) {
    next(error);
  }
};

// * ************************************************
// * Update a user controller
// * ************************************************
exports.updateUser = async (req, res, next) => {
  const oldUsername = req.params.oldUsername;
  const { newUsername, name } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: oldUsername },
      {
        username: newUsername,
        name,
      }
    );

    if (!updatedUser) {
      let error = new Error(`User not found with username: ${oldUsername}`);
      error.status = 400;
      throw error;
    }

    return res.status(200).json({
      message: `User '${oldUsername}' updated with new username: ${newUsername}`,
    });
  } catch (error) {
    next(error);
  }
};

// * ************************************************
// * Delete a user contoller
// * ************************************************
exports.deleteUser = async (req, res, next) => {
  const username = req.params.username;
  try {
    const foundUser = await User.findOne({ username }).populate("todos");
    if (!foundUser) {
      let error = new Error(`User not found with id: ${username}`);
      error.status = 404;
      throw error;
    }

    if (foundUser.todos.length) {
      await Todo.deleteMany({ _id: { $in: foundUser.todos } });
    }
    await User.findOneAndDelete({ username });

    return res.status(200).json({
      message: `User deleted with username: ${username}`,
    });
  } catch (error) {
    next(error);
  }
};
