const Todo = require("../models/Todo");
const mongoose = require("mongoose"); 

exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ owner: req.user.id }).sort({ createdAt: -1 });
    return res.json(todos);
  } catch (err) {
    console.error("Get Todos error:", err.message);
    return res.status(500).json({ message: "Could not fetch todos" });
  }
};

exports.createTodo = async (req, res) => {
  try {
    const { title, description, priority, status, comments, files } = req.body;

    if (!title)
      return res.status(400).json({ message: "Title required" });

    const todo = await Todo.create({
      title,
      description,
      priority,
      status: status || "todo",
      comments: comments || 0,
      files: files || 0,
      owner: req.user.id
    });

    return res.status(201).json(todo);
  } catch (err) {
    console.error("Create Todo error:", err.message);
    return res.status(500).json({ message: "Todo creation failed" });
  }
};

exports.updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: req.user.id },
      req.body,
      { new: true }
    );

    if (!todo)
      return res.status(404).json({ message: "Todo not found" });

    return res.json(todo);
  } catch (err) {
    console.error("Update Todo error:", err.message);
    return res.status(500).json({ message: "Todo update failed" });
  }
};

exports.deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id
    });

    if (!todo)
      return res.status(404).json({ message: "Todo not found" });

    return res.json({ message: "Todo deleted" });
  } catch (err) {
    console.error("Delete Todo error:", err.message);
    return res.status(500).json({ message: "Todo delete failed" });
  }
};