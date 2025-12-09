import React from "react";
import type { Todo } from "../todoClient";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import Tooltip from "@mui/material/Tooltip";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface Props {
  todo: Todo;
  onEdit?: (todo: Todo) => void;
  onToggleComplete?: (id: string) => void;
}

const priorityStyle = (p?: string) => {
  if (p === "High")
    return {
      bgcolor: "#FEE2E2",
      color: "#B91C1C",
      fontWeight: 700,
      px: 1,
      borderRadius: 1,
    };
  if (p === "Medium")
    return {
      bgcolor: "#FEF3C7",
      color: "#92400E",
      fontWeight: 700,
      px: 1,
      borderRadius: 1,
    };
  return {
    bgcolor: "#F3F4F6",
    color: "#374151",
    fontWeight: 700,
    px: 1,
    borderRadius: 1,
  };
};

const TodoCard: React.FC<Props> = ({ todo, onEdit, onToggleComplete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setAnchorEl(null);
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenuClose();
    onEdit?.(todo);
  };

  return (
    <Paper
      elevation={0}
      // onClick={() => onEdit?.(todo)}
      sx={{
        p: 2,
        borderRadius: "22px",
        boxShadow: "0px 8px 20px rgba(15,23,42,0.06)",
        bgcolor: "common.white",
        border: "1px solid rgba(15,23,42,0.03)",
        // cursor: onEdit ? "pointer" : "default",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="start">
        {/* left: priority */}
        <Chip
          label={todo.priority ?? "Low"}
          size="small"
          sx={{ ...priorityStyle(todo.priority), fontSize: 12 }}
        />

        <Box display="flex" alignItems="center" gap={1}>
          {todo.status === "done" && (
            <Chip
              icon={<CheckCircleIcon fontSize="small" />}
              label={todo.completed ? "Completed" : "Mark Complete"}
              size="small"
              sx={{
                bgcolor: todo.completed
                  ? "rgba(16,185,129,0.12)"
                  : "transparent",
                color: todo.completed ? "#059669" : "rgba(0,0,0,0.6)",
                fontWeight: 600,
                fontSize: 12,
                border: todo.completed ? "none" : "1px solid rgba(0,0,0,0.04)",
              }}
              onClick={(e) => {
                e.stopPropagation();
                onToggleComplete?.(todo._id);
              }}
            />
          )}

          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-controls={open ? `menu-${todo._id}` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{ color: "text.secondary" }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>

          <Menu
            id={`menu-${todo._id}`}
            anchorEl={anchorEl}
            open={open}
            onClose={(e) => handleMenuClose(e as React.MouseEvent)}
            onClick={(e) => e.stopPropagation()}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            PaperProps={{ sx: { minWidth: 160 } }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            {/* <MenuItem onClick={handleToggle}>{todo.completed ? "Mark Incomplete" : "Mark Complete"}</MenuItem> */}
          </Menu>
        </Box>
      </Box>

      {/* title */}
      <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 700, mt: 1 }}>
        {todo.title}
      </Typography>

      {todo.description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {todo.description}
        </Typography>
      )}

      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mt={2}
      >
        <Box>
          <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 30, height: 30, fontSize: 12, border: "2px solid #fff" } }}>
            {((todo as unknown as { avatars?: string[] }  ).avatars ?? []).length > 0 ? (
              ((todo as unknown as { avatars?: string[] }).avatars as string[]).slice(0, 4).map((src, i) => (
                <Tooltip key={i} title={`Member ${i + 1}`}>
                  <Avatar alt={`av-${i}`} src={src} />
                </Tooltip>
              ))
            ) : (
              <Box sx={{display:"flex"}}>
                <Tooltip title="Akshay Busa">
                  <Avatar sx={{ bgcolor: "grey.200", color: "text.secondary" }}>AK</Avatar>
                </Tooltip>
                <Tooltip title="OM">
                  <Avatar sx={{ bgcolor: "grey.200", color: "text.secondary" }}>OM</Avatar>
                </Tooltip>
                <Tooltip title="AB">
                  <Avatar sx={{ bgcolor: "grey.200", color: "text.secondary" }}>AB</Avatar>
                </Tooltip>
              </Box>
            )}
          </AvatarGroup>

        </Box>

        <Box display="flex" gap={2} alignItems="center" color="text.secondary">
          <Box display="flex" alignItems="center" gap={0.5}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">{todo.comments ?? 0}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <AttachFileOutlinedIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption">{todo.files ?? 0}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default TodoCard;