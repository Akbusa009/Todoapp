import React from "react";
import type { Todo } from "../todoClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  todo: Todo;
  onEdit?: (todo: Todo) => void;
  onToggleComplete?: (id: string) => void;
}

const TodoCard: React.FC<Props> = ({ todo, onEdit, onToggleComplete }) => {
  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete?.(todo._id);
  };

  return (
    <Paper
      className="todo-card"
      role="button"
      onClick={() => onEdit?.(todo)}
      sx={{ cursor: onEdit ? "pointer" : "default", p: 1.5 }}
      aria-labelledby={`todo-title-${todo._id}`}
      elevation={0}
    >
      <Box display="flex" justifyContent="space-between" alignItems="start" mb={1}>
        <Chip
          label={todo.priority ?? "Low"}
          size="small"
          color={todo.priority === "High" ? "error" : "default"}
          aria-label={`priority ${todo.priority ?? "Low"}`}
        />

        <Box display="flex" alignItems="center" gap={1}>
          {/* Completed  */}
          {todo.status === "done" && (
            <Chip
              icon={<CheckCircleIcon fontSize="small" />}
              label={todo.completed ? "Completed" : "Mark Complete"}
              size="small"
              color={todo.completed ? "success" : "default"}
              onClick={handleToggle}
              sx={{ cursor: "pointer" }}
              aria-label={todo.completed ? "completed" : "mark complete"}
            />
          )}

          <Box className="small-muted" aria-hidden>
            ⋯
          </Box>
        </Box>
      </Box>

      <Typography id={`todo-title-${todo._id}`} variant="h6" sx={{ fontSize: 16, mb: 0.5 }}>
        {todo.title}
      </Typography>

      {todo.description && (
        <Typography variant="body2" className="small-muted" sx={{ mb: 1 }}>
          {todo.description}
        </Typography>
      )}

      <Box display="flex" justifyContent="space-between" alignItems="center" mt={1}>
        <Stack direction="row" spacing={1} alignItems="center">
          <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 28, height: 28, fontSize: 12 } }}>
            <Tooltip title="Akshay Busa"><Avatar aria-label="Akshay Busa">AB</Avatar></Tooltip>
            <Tooltip title="om Anghan"><Avatar aria-label="Maya Khan">OM</Avatar></Tooltip>
            <Tooltip title="Akshit Chotaliya"><Avatar aria-label="Sam Roy">AK</Avatar></Tooltip>
          </AvatarGroup>
        </Stack>

        <Box className="small-muted" display="flex" gap={2} alignItems="center" aria-hidden>
          <span title={`${todo.comments ?? 0} comments`}>💬 {todo.comments ?? 0}</span>
          <span title={`${todo.files ?? 0} files`}>📎 {todo.files ?? 0}</span>
        </Box>
      </Box>
    </Paper>
  );
};

export default TodoCard;
