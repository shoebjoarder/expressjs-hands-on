const requestLogger = (req, _, next) => {
  // * Task 2.3: Starts here
  console.log(`Incoming request: ${req.method} ${req.url}`);
  next();
  // * Task 2.3: Continues to todo-controller.js (A)
};

module.exports = requestLogger;
