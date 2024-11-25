const express = require("express");
const userRouter = require("./routes/user-routes");
const errorHandler = require("./middleware/error-handler-middleware");
const mongoose = require("mongoose");

PORT = process.env.PORT | 3000;
MONGO_URI = "mongodb://127.0.0.1:27017/express-hands-on";

const app = express();

app.use(express.json());

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  });

app.use("/users", userRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
