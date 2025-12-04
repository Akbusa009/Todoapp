import React from "react";
import type { Todo } from "../todoClient";
import {
  Avatar,
  AvatarGroup,
  Box,
  Chip,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

interface Props {
  todo: Todo;
  onEdit?: (todo: Todo) => void;
  onToggleComplete?: (id: string) => void;
}

type PriorityStyle = Pick<React.CSSProperties, "backgroundColor" | "color">;

const priorityChipStyles: Record<NonNullable<Todo["priority"]> | "Low", PriorityStyle> = {
  Low: {
    backgroundColor: "#F5F0FF",
    color: "#6851FF",
  },
  Medium: {
    backgroundColor: "#FFF6E6",
    color: "#FF9F24",
  },
  High: {
    backgroundColor: "#FFECEE",
    color: "#FF5A65",
  },
};

const TodoCard: React.FC<Props> = ({ todo, onEdit, onToggleComplete }) => {
  const priority = todo.priority ?? "Low";
  const chipSx = priorityChipStyles[priority] ?? priorityChipStyles.Low;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleComplete?.(todo._id);
  };

  const handleCardClick = () => {
    onEdit?.(todo);
  };

  return (
    <Paper
      onClick={handleCardClick}
      aria-labelledby={`todo-title-${todo._id}`}
      elevation={0}
      sx={{
        mb: 2.5,
        p: 2.5,
        borderRadius: "22px",
        bgcolor: "#ffffff",
        boxShadow: "0 18px 45px rgba(15,23,42,0.06)",
        cursor: onEdit ? "pointer" : "default",
        transition: "transform 150ms ease, box-shadow 150ms ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 22px 55px rgba(15,23,42,0.10)",
        },
      }}
    >
      <Box mb={2.0} display="flex" justifyContent="space-between" alignItems="flex-start" gap={1.5}>
        <Chip
          label={priority}
          size="small"
          sx={{
            px: 1.2,
            height: 24,
            fontSize: 11,
            fontWeight: 600,
            borderRadius: "999px",
            backgroundColor: chipSx.backgroundColor,
            color: chipSx.color,
          }}
        />

        <Box display="flex" alignItems="center" gap={1}>
          {todo.status === "done" && (
            <Chip
              label={todo.completed ? "Completed" : "Mark Complete"}
              onClick={handleToggle}
              size="small"
              sx={{
                borderRadius: "999px",
                px: 1.5,
                height: 24,
                fontSize: 11,
                fontWeight: 600,
                bgcolor: todo.completed ? "#E6F6EF" : "#E5E7EB",
                color: todo.completed ? "#23B883" : "#4B5563",
                cursor: "pointer",
              }}
            />
          )}

          <IconButton
            aria-label="More options"
            size="small"
            onClick={(e) => e.stopPropagation()}
            sx={{
              width: 32,
              height: 32,
              borderRadius: "999px",
              color: "#9CA3AF",
              "&:hover": {
                bgcolor: "#F3F4F6",
                color: "#4B5563",
              },
            }}
          >
            <MoreHorizIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Typography
        id={`todo-title-${todo._id}`}
        variant="subtitle1"
        sx={{
          fontWeight: 600,
          fontSize: 15,
          mb: todo.description ? 0.5 : 0,
          color: "#0f172a",
        }}
      >
        {todo.title}
      </Typography>

      {todo.description && (
        <Typography
          variant="body2"
          sx={{
            fontSize: 12,
            lineHeight: 1.5,
            color: "#6b7280",
            mb: 2,
          }}
        >
          {todo.description}
        </Typography>
      )}

      <Box mt={1} display="flex" justifyContent="space-between" alignItems="center">
        <AvatarGroup
          max={3}
          sx={{
            "& .MuiAvatar-root": {
              width: 28,
              height: 28,
              fontSize: 11,
              fontWeight: 600,
              border: "2px solid #ffffff",
              boxShadow: "0 2px 4px rgba(15,23,42,0.15)",
            },
          }}
        >
          <Avatar sx={{ bgcolor: "#F97316" }}>AB</Avatar>
          <Avatar sx={{ bgcolor: "#0EA5E9" }}>OM</Avatar>
          <Avatar sx={{ bgcolor: "#6366F1" }}>AK</Avatar>
        </AvatarGroup>

        <Box display="flex" alignItems="center" gap={3} sx={{ color: "#9CA3AF", fontSize: 11 }}>
          <Box display="flex" alignItems="center" gap={0.5} aria-hidden>
            <Box component="span" sx={{ fontSize: 14 }}>💬</Box>
            <Typography variant="caption" sx={{ fontSize: 11 }}>
              {todo.comments ?? 0} comments
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} aria-hidden>
            <Box component="span" sx={{ fontSize: 14 }}>📎</Box>
            <Typography variant="caption" sx={{ fontSize: 11 }}>
              {todo.files ?? 0} files
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default TodoCard;
