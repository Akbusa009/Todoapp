import { Request, Response } from "express";

import Todo, { Priority, TodoStatus } from "../models/Todo";

type AuthedRequest<Body = unknown, Params = Record<string, string>> = Request<
  Params,
  unknown,
  Body
>;

type CreateTodoBody = {
  title?: string;
  description?: string;
  priority?: Priority;
  status?: TodoStatus;
  comments?: number;
  files?: number;
};

type UpdateTodoBody = Partial<
  CreateTodoBody & {
    completed?: boolean;
  }
>;

const ensureUser = (
  req: Request
): { id: string; email: string; name: string } | null =>
  req.user ? { ...req.user } : null;

export const getTodos = async (req: AuthedRequest, res: Response) => {
  try {
    const user = ensureUser(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const todos = await Todo.find({ owner: user.id }).sort({ createdAt: -1 });
    return res.json(todos);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Get Todos error:", message);
    return res.status(500).json({ message: "Could not fetch todos" });
  }
};

export const createTodo = async (
  req: AuthedRequest<CreateTodoBody>,
  res: Response
) => {
  try {
    const user = ensureUser(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description, priority, status, comments, files } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title required" });
    }

    const todo = await Todo.create({
      title,
      description,
      priority,
      status: status || "todo",
      comments: comments ?? 0,
      files: files ?? 0,
      owner: user.id
    });

    return res.status(201).json(todo);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Create Todo error:", message);
    return res.status(500).json({ message: "Todo creation failed" });
  }
};

export const updateTodo = async (
  req: AuthedRequest<UpdateTodoBody, { id: string }>,
  res: Response
) => {
  try {
    const user = ensureUser(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, owner: user.id },
      req.body,
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json(todo);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Update Todo error:", message);
    return res.status(500).json({ message: "Todo update failed" });
  }
};

export const deleteTodo = async (
  req: AuthedRequest<unknown, { id: string }>,
  res: Response
) => {
  try {
    const user = ensureUser(req);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      owner: user.id
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.json({ message: "Todo deleted" });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Delete Todo error:", message);
    return res.status(500).json({ message: "Todo delete failed" });
  }
};

