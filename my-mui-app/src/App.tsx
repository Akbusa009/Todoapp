import React, { useEffect, useMemo, useState } from "react";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import {
  ThemeProvider,
  CssBaseline,
  Container,
  Box,
  Typography,
} from "@mui/material";
import { getTheme } from "./theme";
// import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Column from "./components/Column";
import "./index.css";
import ControlsBar from "./components/ControlsBar";
import { toast } from "react-toastify";

import { getStoredToken, getStoredUser } from "./authClient";
import { setAuthToken } from "./api";
import {
  fetchTodos,
  createTodo as apiCreateTodo,
  updateTodo as apiUpdateTodo,
  deleteTodo as apiDeleteTodo,
  type Todo,
} from "./todoClient";

const App: React.FC = () => {
  const theme = useMemo(() => getTheme("light"), []);
  const [user] = useState(() => getStoredUser());
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
      if (!user) {
        setTodos([]);
        return;
      }
      try {
        const list = await fetchTodos();
        setTodos(list);
      } catch (err: unknown) {
        if (err instanceof Error) {
          console.error("Failed to fetch todos:", err.message);
        } else {
          console.error("Failed to fetch todos:", err);
        }
      }
    };
    load();
  }, [user]);

  // CREATE
  const addTodo = async (
    payload: Omit<Parameters<typeof apiCreateTodo>[0], "status">,
    status: Todo["status"]
  ) => {
    try {
      const created = await apiCreateTodo({ ...payload, status });
      setTodos((prev) => [created, ...prev]);
      toast.success("Task created successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("create_todo_failed:", err.message);
        toast.error("Failed to create task. Please try again.");
      } else {
        console.error("create_todo_failed:", err);
        toast.error("Failed to create task. Please try again.");
      }
    }
  };

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
      toast.success("Task updated successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("update todo failed:", err.message);
        toast.error("Failed to update task. Please try again.");
      } else {
        console.error("update todo failed:", err);
        toast.error("Failed to update task. Please try again.");
      }
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await apiDeleteTodo(id);
      setTodos((prev) => prev.filter((t) => t._id !== id));
      toast.success("Task deleted successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("delete todo failed:", err.message);
        toast.error("Failed to delete task. Please try again.");
      } else {
        console.error("delete todo failed:", err);
        toast.error("Failed to delete task. Please try again.");
      }
    }
  };


  const matchPriority = (t: Todo) => {
    if (priorityFilter === "All") return true;
    return (t.priority ?? "Low") === priorityFilter;
  };

  const isInDateRange = (t: Todo) => {
    if (dateFilter === "All") return true;
    const createdAt = t.createdAt ? new Date(t.createdAt) : null;
    if (!createdAt) return true;
    const now = new Date();
    if (dateFilter === "Today")
      return createdAt.toDateString() === now.toDateString();
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
  const todoList = todos.filter(
    (t) => t.status === "todo" && matchPriority(t) && isInDateRange(t)
  );
  const progressList = todos.filter(
    (t) => t.status === "progress" && matchPriority(t) && isInDateRange(t)
  );
  const reviewList = todos.filter(
    (t) => t.status === "review" && matchPriority(t) && isInDateRange(t)
  );
  const doneList = todos.filter(
    (t) => t.status === "done" && matchPriority(t) && isInDateRange(t)
  );

  const columns = [
    { title: "To Do", todos: todoList, accent: "#7c3aed", statusKey: "todo" },
    {
      title: "On Progress",
      todos: progressList,
      accent: "#f59e0b",
      statusKey: "progress",
    },
    { title: "Review", todos: reviewList, accent: "#06b6d4", statusKey: "review" },
    { title: "Done", todos: doneList, accent: "#16a34a", statusKey: "done" },
  ] as const;

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const sourceStatus = source.droppableId as Todo["status"];
    const destStatus = destination.droppableId as Todo["status"];
    const destIndex = destination.index;

    setTodos((prev) => {
      const current = [...prev];
      const movingIndex = current.findIndex((t) => t._id === draggableId);
      if (movingIndex === -1) return prev;

      const movingTodo = { ...current[movingIndex], status: destStatus };
      current.splice(movingIndex, 1);

      const destList = current.filter((t) => t.status === destStatus);
      const beforeId = destList[destIndex]?._id;
      const insertIndex = beforeId ? current.findIndex((t) => t._id === beforeId) : current.length;
      current.splice(insertIndex, 0, movingTodo);

      if (sourceStatus !== destStatus) {
        void updateTodo(movingTodo);
      }

      return current;
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>

        <Navbar />

        <Box
          className="app-shell"
          sx={{
            display: "flex",
            alignItems: "stretch",
            height: "calc(100vh - 64px)",
            overflow: "hidden",
          }}
        >
          {/* <Sidebar /> */}
          <Box
            className="main-area"
            sx={{
              background: "rgba(255, 255, 255, 1)",
              height: "100%",
              py: 6,
              px: 0,
              flex: 1,
              overflowY: "auto",
            }}
          >

            <Container maxWidth="lg" disableGutters >
              <Box mb={3}>
                <Box mb={1}>
                  <Typography variant="h4" sx={{
                    fontFamily: "Inter, sans-serif",
                    fontWeight: 600,
                    fontSize: "46px",
                    lineHeight: "100%",
                    letterSpacing: "0px",
                    color: "#0f172a",
                    textTransform: "none",
                  }}>
                    Todo App
                  </Typography>
                  <Typography sx={{ color: "rgba(15,23,42,0.6)" }}></Typography>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <ControlsBar
                    priority={priorityFilter}
                    date={dateFilter}
                    onPriorityChange={setPriorityFilter}
                    onDateChange={setDateFilter}
                  />
                </Box>
              </Box>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Box
                  className="columns"
                  sx={{ display: "flex", gap: 3, alignItems: "flex-start" }}
                >
                  {columns.map(({ title, todos, accent, statusKey }) => (
                    <Column
                      key={statusKey}
                      title={title}
                      todos={todos}
                      accent={accent}
                      statusKey={statusKey}
                      onAdd={addTodo}
                      onUpdate={updateTodo}
                      onDelete={deleteTodo}
                    />
                  ))}
                </Box>
              </DragDropContext>
            </Container>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;