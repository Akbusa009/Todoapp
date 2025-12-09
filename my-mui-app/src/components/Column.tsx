import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import TodoCard from "./TodoCard";
import type { Todo, TodoPayload } from "../todoClient";
import Stack from "@mui/material/Stack";

interface ColumnProps {
  title: string;
  todos: Todo[];
  accent?: string;
  statusKey: Todo["status"];
  onAdd: (payload: Omit<TodoPayload, "status">, status: Todo["status"]) => void;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const Column: React.FC<ColumnProps> = ({
  title,
  todos,
  accent = "#6366f1",
  statusKey,
  onAdd,
  onUpdate,
  onDelete,
}) => {
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Todo | null>(null);

  // form fields
  const [titleVal, setTitleVal] = useState("");
  const [descVal, setDescVal] = useState("");
  const [priorityVal, setPriorityVal] = useState<Todo["priority"]>("Low");
  const [statusVal, setStatusVal] = useState<Todo["status"]>(statusKey);

  useEffect(() => {
    setStatusVal(statusKey);
  }, [statusKey]);

  const openAdd = () => {
    setEditing(null);
    setTitleVal("");
    setDescVal("");
    setPriorityVal("Low");
    setStatusVal(statusKey);
    setOpen(true);
  };

  const openEdit = (todo: Todo) => {
    setEditing(todo);
    setTitleVal(todo.title);
    setDescVal(todo.description ?? "");
    setPriorityVal(todo.priority ?? "Low");
    setStatusVal(todo.status);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditing(null);
  };

  const handleSave = () => {
    if (!titleVal.trim()) return;
    if (editing) {
      onUpdate({
        ...editing,
        title: titleVal,
        description: descVal,
        priority: priorityVal,
        status: statusVal,
      });
    } else {
      onAdd(
        { title: titleVal, description: descVal, priority: priorityVal, comments: 0, files: 0 },
        statusVal
      );
    }
    handleClose();
  };

  const handleDelete = () => {
    if (!editing) return;
    onDelete(editing._id);
    handleClose();
  };

  return (
    <Box sx={{ width: 320, minWidth: 320, bgcolor: "#F5F5F5", borderRadius: 1, p: 2 }}>
      {/* Header Pill */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 2,
          py: 1.5,
          backdropFilter: "blur(10px)",
          mb: 1,
        }}
      >
        <Box display="flex" alignItems="center" gap={1.5}>
          <Box
            component="span"
            sx={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              bgcolor: accent,
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 600,
              fontSize: "0.9rem",
              color: "#1a1a1a",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              minWidth: 24,
              height: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 2,
              bgcolor: "rgba(0, 0, 0, 0.04)",
              px: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#666",
              }}
            >
              {todos.length}
            </Typography>
          </Box>
        </Box>

        {statusKey === "todo" && (
          <IconButton
            size="small"
            onClick={openAdd}
            sx={{
              width: 28,
              height: 28,
              bgcolor: "rgba(99, 102, 241, 0.1)",
              color: accent,
              "&:hover": {
                bgcolor: "rgba(99, 102, 241, 0.2)",
              },
            }}
          >
            <AddIcon sx={{ fontSize: 18 }} />
          </IconButton>
        )}
      </Box>

      {/* Accent Line */}
      <Box
        sx={{
          height: 4,
          borderRadius: 2,
          bgcolor: accent,
          mb: 2.5,
        }}
      />

      {/* Cards Container */}
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        {todos.map((t) => (
          <TodoCard
            key={t._id}
            todo={t}
            onEdit={openEdit}
            onToggleComplete={() => onUpdate({ ...t, completed: !t.completed })}
          />
        ))}
      </Box>

      {/* Dialog */}
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)",
          },
        }}
      >
        <DialogTitle sx={{ fontWeight: 600, fontSize: "1.25rem" }}>
          {editing ? "Edit Task" : "Add Task"}
        </DialogTitle>

        <DialogContent dividers sx={{ pt: 3 }}>
          <Stack spacing={2.5}>
            <TextField
              autoFocus
              label="Title"
              fullWidth
              value={titleVal}
              onChange={(e) => setTitleVal(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={descVal}
              onChange={(e) => setDescVal(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              select
              label="Status"
              fullWidth
              value={statusVal}
              onChange={(e) => setStatusVal(e.target.value as Todo["status"])}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="progress">On Progress</MenuItem>
              <MenuItem value="review">Review</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>

            <TextField
              select
              label="Priority"
              fullWidth
              value={priorityVal}
              onChange={(e) => setPriorityVal(e.target.value as Todo["priority"])}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
            </TextField>
          </Stack>
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2.5 }}>
          {editing ? (
            <Button
              color="error"
              onClick={handleDelete}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Delete
            </Button>
          ) : (
            <Button
              onClick={handleClose}
              sx={{
                borderRadius: 2,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Cancel
            </Button>
          )}

          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
            }}
          >
            {editing ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Column;