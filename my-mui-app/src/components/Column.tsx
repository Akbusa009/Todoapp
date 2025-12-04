import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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

interface ColumnProps {
  title: string;
  todos: Todo[];
  accent?: string;
  statusKey: Todo["status"];
  onAdd: (payload: Omit<TodoPayload, "status">, status: Todo["status"]) => void;
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

const Column: React.FC<ColumnProps> = ({ title, todos, accent = "#6366f1", statusKey, onAdd, onUpdate, onDelete }) => {
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
    <Box className="column">
      <Paper elevation={0} sx={{ p: 1, background: "transparent" }}>
        <Box className="column-header" sx={{ border: `4px solid ${accent}`, background: "rgba(255,255,255,0.6)" }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Box component="span" sx={{ width: 8, height: 8, borderRadius: "50%", background: accent }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>{title}</Typography>
            <Typography className="small-muted" sx={{ ml: 1 }}>{todos.length}</Typography>
          </Box>

          {/* show + only for To Do column */}
          {statusKey === "todo" ? (
            <IconButton size="small" onClick={openAdd} aria-label={`Add ${title}`}>
              <AddIcon />
            </IconButton>
          ) : (
            <Box sx={{ width: 40 }} /> 
          )}
        </Box>
      </Paper>

      <Box className="card-list">
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
            <Button color="error" onClick={handleDelete}>Delete</Button>
          ) : (
            <Button onClick={handleClose}>Cancel</Button>
          )}

          <Button variant="contained" onClick={handleSave}>{editing ? "Save" : "Add"}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Column;
