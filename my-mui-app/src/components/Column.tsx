import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import TodoCard from "./TodoCard";
import type { Todo, TodoPayload } from "../todoClient";

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
        status: statusVal
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
    <Box
      className="column"
      sx={{
        flex: 1,
        minWidth: 260,
        maxWidth: 360,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box mb={2.5}>
        <Paper
          elevation={0}
          sx={{
            bgcolor: "transparent",
            boxShadow: "none",
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            sx={{ px: 0.5, pb: 0.5 }}
          >
            <Box display="flex" alignItems="center" gap={1}>
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
                  fontSize: 14,
                  color: "#0f172a",
                }}
              >
                {title}
              </Typography>
              <Box
                sx={{
                  ml: 0.5,
                  px: 1,
                  py: 0.25,
                  borderRadius: "999px",
                  bgcolor: "#E5E7EB",
                  fontSize: 11,
                  fontWeight: 500,
                  color: "#6B7280",
                }}
              >
                {todos.length}
              </Box>
            </Box>

            {statusKey === "todo" ? (
              <IconButton
                size="small"
                aria-label={`Add ${title}`}
                onClick={openAdd}
                sx={{
                  width: 30,
                  height: 30,
                  borderRadius: "999px",
                  bgcolor: "#111827",
                  color: "#ffffff",
                  boxShadow: "0 4px 10px rgba(15,23,42,0.3)",
                  "&:hover": {
                    bgcolor: "#020617",
                  },
                }}
              >
                <AddIcon sx={{ fontSize: 18 }} />
              </IconButton>
            ) : (
              <Box sx={{ width: 30, height: 30 }} />
            )}
          </Box>

          <Box
            sx={{
              mt: 0.5,
              height: 3,
              borderRadius: 999,
              bgcolor: accent,
            }}
          />
        </Paper>
      </Box>

      <Box
        className="card-list"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 0,
        }}
      >
        {todos.map(t => (
          <TodoCard
            key={t._id}
            todo={t}
            onEdit={openEdit}
            onToggleComplete={() => onUpdate({ ...t, completed: !t.completed })}
          />
        ))}
      </Box>

      {/* Dialog for Add / Edit */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>{editing ? "Edit Task" : `Add Task`}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Title"
            fullWidth
            value={titleVal}
            onChange={e => setTitleVal(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={3}
            value={descVal}
            onChange={e => setDescVal(e.target.value)}
          />

          {/* Status select - allows creating directly as progress/review/done */}
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            value={statusVal}
            onChange={e => setStatusVal(e.target.value as Todo["status"])}
          >
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="progress">On Progress</MenuItem>
            <MenuItem value="review">Review</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </TextField>

          <TextField
            select
            margin="dense"
            label="Priority"
            fullWidth
            value={priorityVal}
            onChange={e => setPriorityVal(e.target.value as Todo["priority"])}
          >
            <MenuItem value="Low">Low</MenuItem>
            <MenuItem value="Medium">Medium</MenuItem>
            <MenuItem value="High">High</MenuItem>
          </TextField>
        </DialogContent>

        <DialogActions>
          {/* show delete only when editing */}
          {editing ? (
            <Button color="error" onClick={handleDelete}>
              Delete
            </Button>
          ) : (
            <Button onClick={handleClose}>Cancel</Button>
          )}

          <Button variant="contained" onClick={handleSave}>
            {editing ? "Save" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Column;
