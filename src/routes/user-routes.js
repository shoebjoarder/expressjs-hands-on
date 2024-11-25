// * ************************************************
// *  Routing using Express Router
// * ************************************************
const express = require("express");
const userController = require("../controllers/user-controllers");
const todoController = require("../controllers/todo-controllers");
const authentication = require("../middleware/auth-middleware");
const requestLogger = require("../middleware/logger-middleware");
const userRouter = express.Router();

// * ************************************************
// * Create a new user route
// * ************************************************
userRouter.post("/create", userController.createUser);

// * ************************************************
// * Get a user route
// * ************************************************
userRouter.get("/:username", userController.getUserDetails);

// * ************************************************
// * Update a user route
// * ************************************************
userRouter.put("/:oldUsername", authentication, userController.updateUser);

// * ************************************************
// * Delete a user route
// * ************************************************
userRouter.delete("/:username", authentication, userController.deleteUser);

// * ************************************************
// * Create a new todo route
// * ************************************************
// * Task 2.3: Continues from logger-middleware.js (A)

// * Task 2.1: Starts here


// * Task 2.1: Ends here

// * Task 2.3: Ends here

// * ************************************************
// * Get all user todos route
// * ************************************************
// * Task 3.1: Starts here


// * Task 3.1: Ends here

// * ************************************************
// * Mark todo as either completed or not completed route
// * ************************************************
// * Task 4.1: Starts here


// * Task 4.1: Ends here

// * ************************************************
// * Delete a todo route
// * ************************************************
// * Task 5.1: Starts here


// * Task 5.1: Ends here

module.exports = userRouter;
