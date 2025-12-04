const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
require("express-async-errors");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todos");
const { errorHandler } = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// error handler (last)
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
const MONGO =
  process.env.MONGO_URI ||
  "mongodb+srv://akshaybusa009:FdhX0ht9YDur0GdS@cluster0.zyos5yc.mongodb.net/TodoApp";

mongoose
  .connect(MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
