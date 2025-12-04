import React, { useEffect, useMemo, useState } from "react";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { getTheme } from "./theme";
import BlankSidebar from "./components/BlankSidebar";
import BlankNavbar from "./components/BlankNavbar";
import Column from "./components/Column";
import "./index.css";
import ControlsBar from "./components/ControlsBar";

import { getStoredToken, getStoredUser } from "./authClient";
import { setAuthToken } from "./api";
import {
  fetchTodos,
  createTodo as apiCreateTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
  type Todo,
} from "./todoClient";

import { } from "react-router-dom";

const App: React.FC = () => {
  const theme = useMemo(() => getTheme("light"), []);
  const user = getStoredUser();
  // todos state (server-provided shape)
  const [todos, setTodos] = useState<Todo[]>([]);

  // filters state
  const [priorityFilter, setPriorityFilter] = useState<
    "All" | "Low" | "Medium" | "High"
  >("All");
  const [dateFilter, setDateFilter] = useState<
    "All" | "Today" | "ThisWeek" | "ThisMonth"
  >("All");

  useEffect(() => {
    const token = getStoredToken();
    if (token) setAuthToken(token);
  }, []);

  useEffect(() => {
    const load = async () => {
      if (!user) return;
      try {
        const list = await fetchTodos();
        setTodos(list);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
      }
    };
    load();
  }, []);

  const addTodo = async (
    payload: Omit<Parameters<typeof apiCreateTodo>[0], "status">,
    status: Todo["status"]
  ) => {
    try {
      const created = await apiCreateTodo({ ...payload, status });
      setTodos((prev) => [created, ...prev]);
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("create_todo_failed:", err.message);
      } else {
        console.error("create_todo_failed:", err);
      }
    }
  };

  // UPDATE
  const updateTodo = async (updated: Todo) => {
    try {
      const saved = await apiUpdateTodo(updated._id, {
        title: updated.title,
        description: updated.description,
        priority: updated.priority,
        status: updated.status,
        completed: updated.completed,
        comments: updated.comments,
        files: updated.files,
      });
      setTodos((prev) => prev.map((t) => (t._id === saved._id ? saved : t)));
    } catch (err) {
      console.error("update todo failed", err);
    }
  };

  // DELETE
  const deleteTodo = async (id: string) => {
    try {
      await apiDeleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("delete todo failed", err);
    }
  };

  // helper: match priority
  const matchPriority = (t: Todo) => {
    if (priorityFilter === "All") return true;
    return (t.priority ?? "Low") === priorityFilter;
  };

  // helper: match date (uses server createdAt if available)
  const isInDateRange = (t: Todo) => {
    if (dateFilter === "All") return true;
    const createdAt = t.createdAt ? new Date(t.createdAt) : null;
    if (!createdAt) return true; // if missing, don't filter out
    const now = new Date();
    if (dateFilter === "Today") return createdAt.toDateString() === now.toDateString();
    if (dateFilter === "ThisWeek") {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      return createdAt >= oneWeekAgo;
    }
    if (dateFilter === "ThisMonth")
      return (
        createdAt.getMonth() === now.getMonth() &&
        createdAt.getFullYear() === now.getFullYear()
      );
    return true;
  };

  // Lists by status + filters
  const todoList = todos.filter((t) => t.status === "todo" && matchPriority(t) && isInDateRange(t));
  const progressList = todos.filter((t) => t.status === "progress" && matchPriority(t) && isInDateRange(t));
  const reviewList = todos.filter((t) => t.status === "review" && matchPriority(t) && isInDateRange(t));
  const doneList = todos.filter((t) => t.status === "done" && matchPriority(t) && isInDateRange(t));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        {/* BlankNavbar */}
        <BlankNavbar />
        <Box className="app-shell">
          <BlankSidebar />
          <Box className="main-area">
            <Container maxWidth="lg">
              <Box
                mb={3}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Box>
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    Todo App
                  </Typography>
                  <Typography sx={{ color: "rgba(15,23,42,0.6)" }}>
                    Project
                  </Typography>
                </Box>
                <ControlsBar
                  priority={priorityFilter}
                  date={dateFilter}
                  onPriorityChange={setPriorityFilter}
                  onDateChange={setDateFilter}
                />
              </Box>

              <Box className="columns">
                <Column
                  title="To Do"
                  todos={todoList}
                  accent="#7c3aed"
                  statusKey="todo"
                  onAdd={addTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
                <Column
                  title="On Progress"
                  todos={progressList}
                  accent="#f59e0b"
                  statusKey="progress"
                  onAdd={addTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
                <Column
                  title="Review"
                  todos={reviewList}
                  accent="#06b6d4"
                  statusKey="review"
                  onAdd={addTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
                <Column
                  title="Done"
                  todos={doneList}
                  accent="#16a34a"
                  statusKey="done"
                  onAdd={addTodo}
                  onUpdate={updateTodo}
                  onDelete={deleteTodo}
                />
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
