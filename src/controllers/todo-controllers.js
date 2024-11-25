const Todo = require("../models/todo-model");
const User = require("../models/user-model");

// * ************************************************
// * Create a todo controller
// * ************************************************
exports.createTodo = async (req, res, next) => {
  // * Task 2.2: Starts here
  const username = req.params.username;
  const title = req.body.title;
  try {
    const foundUser = await User.findOne({ username });
    if (!foundUser) {
      const error = new Error(`User not found with username: ${username}`);
      error.status = 404;
      throw error;
    }

    const newTodo = await new Todo({ title }).save();

    foundUser.todos.push(newTodo._id);
    await foundUser.save();

    return res.status(201).json({
      message: `New todo created!`,
      data: newTodo,
    });
  } catch (error) {
    next(error);
  }
  // * Task 2.2: Ends here
};

// * ************************************************
// * Get all todos of a user contoller
// * ************************************************
exports.getAllUserTodos = async (req, res, next) => {
  // * Task 3.2: Starts here
  const username = req.params.username;
  try {
    const foundUser = await User.findOne({ username }).populate("todos");
    if (!foundUser) {
      let error = new Error(`User not found with username: ${username}`);
      error.status = 404;
      throw error;
    }
    return res.status(200).json({
      message: `Found all todos for user: ${foundUser.username}`,
      data: foundUser.todos,
    });
  } catch (error) {
    next(error);
  }
  // * Task 3.2: Ends here
};

// * ************************************************
// * Mark todo as either completed or not completed controller
// * ************************************************
exports.toggleUpdateTodoComplete = async (req, res, next) => {
  // * Task 4.2: Starts here
  const username = req.params.username;
  const todoId = req.params.todoId;
  const completed = req.params.completed;
  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      const error = new Error(`User not found with username: ${username}`);
      error.status = 404;
      throw error;
    }

    if (!foundUser.todos.includes(todoId)) {
      const error = new Error(
        `Todo with id ${todoId} does not 
            belong to the user: ${foundUser.username}`
      );
      error.status = 403;
      throw error;
    }

    const updatedTodo = await Todo.findByIdAndUpdate(todoId, {
      completed,
      updatedAt: Date.now(),
    });

    if (!updatedTodo) {
      let error = new Error(`Todo not found with id: ${todoId}`);
      error.status = 400;
      throw error;
    }

    return res.status(200).json({
      message: `Todo marked as ${completed === "true" ? "completed" : "not completed"}`,
    });
  } catch (error) {
    next(error);
  }
  // * Task 4.2: Ends here
};

// * ************************************************
// * Delete a todo contoller
// * ************************************************
exports.deleteTodo = async (req, res, next) => {
  // * Task 5.2: Starts here
  const username = req.params.username;
  const todoId = req.params.todoId;
  try {
    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      const error = new Error(`User not found with username: ${username}`);
      error.status = 404;
      throw error;
    }

    if (!foundUser.todos.includes(todoId)) {
      const error = new Error(
        `Todo with id ${todoId} does not 
            belong to the user: ${foundUser.username}`
      );
      error.status = 403;
      throw error;
    }

    const deletedTodo = await Todo.findByIdAndDelete(todoId);

    if (!deletedTodo) {
      const error = new Error(`Todo not found with id: ${todoId}`);
      error.status = 404;
      throw error;
    }

    foundUser.todos = foundUser.todos.filter(
      (todo) => todo.toString() !== todoId.toString()
    );
    await foundUser.save();

    return res.status(200).json({
      message: `Todo with id ${todoId} successfully deleted.`,
    });
  } catch (error) {
    next(error);
  }
  // * Task 5.2: Ends here
};
