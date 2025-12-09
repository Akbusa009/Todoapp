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
import DeleteIcon from "@mui/icons-material/Delete";
import image3 from "../utils/image3.png";
import image2 from "../utils/image2.png";
import image1 from "../utils/image1.png";
import chaticon from "../utils/chaticon.png";
import fileicon from "../utils/fileicon.png";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { toast } from "react-toastify";

interface Props {
  todo: Todo;
  onEdit?: (todo: Todo) => void;
  onDelete?: (id: string) => void; 
}

const priorityStyle = (p?: string) => {
  if (p === "High")
    return {
      bgcolor: "#D8727D1A",
      color: "#D8727D",
      fontWeight: 700,
      px: 1,
      borderRadius: "12px",
    } as const;
  if (p === "Medium")
    return {
      bgcolor: "#DFA87433",
      color: "#D58D49",
      fontWeight: 700,
      px: 1,
      borderRadius: "12px",
    } as const;
  return {
    bgcolor: "#F3F4F6",
    color: "#374151",
    fontWeight: 700,
    px: 1,
    borderRadius: "12px",
  } as const;
};

const TRUNCATE_LENGTH = 150;

const TodoCard: React.FC<Props> = ({ todo, onEdit, onDelete }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [expanded, setExpanded] = React.useState(false);
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
    toast.info(`Editing task: ${todo.title}`);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleMenuClose();
    toast.info(`Deleting task: ${todo.title}`);
    onDelete?.(todo._id);
  };

  const description = todo.description ?? "";
  const isLong = description.length > TRUNCATE_LENGTH;
  const displayed = !isLong || expanded ? description : description.substring(0, TRUNCATE_LENGTH) + "...";

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderRadius: "15px",
        boxShadow: "0px 8px 20px rgba(15,23,42,0.06)",
        bgcolor: "rgba(255, 255, 255, 1)",
        border: "1px solid rgba(15,23,42,0.03)",
        width: "304px",
        minHeight: "120px",
      }}
    >
      {/* === Header */}
      <Box display="flex" justifyContent="space-between" alignItems="start">
        {/* LEFT */}
        {todo.status === "done" ? (
          <Chip
            label="Completed"
            size="small"
            sx={{
              borderRadius: "5px",
              fontWeight: 600,
              fontSize: 12,
              bgcolor: "rgba(16,185,129,0.12)",
              color: "#059669",
              py: "4px",
              px: 1,
              height: 28,
            }}
            aria-label="Completed"
          />
        ) : (
          <Chip
            label={todo.priority ?? "Low"}
            size="small"
            sx={{
              ...priorityStyle(todo.priority),
              fontSize: 12,
              borderRadius: "5px",
              px: 1,
              height: 28,
            }}
            aria-label={`priority ${todo.priority ?? "Low"}`}
          />
        )}

        {/* RIGHT: menu */}
        <Box display="flex" alignItems="center" gap={1}>
          <IconButton
            size="small"
            onClick={handleMenuOpen}
            aria-controls={open ? `menu-${todo._id}` : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            sx={{ color: "text.secondary", width: 36, height: 36 }}
          >
            <MoreHorizIcon fontSize="small"/>
          </IconButton>

          <Menu
            id={`menu-${todo._id}`}
            anchorEl={anchorEl}
            open={open}
            onClose={(e) => handleMenuClose(e as React.MouseEvent)}
            onClick={(e) => e.stopPropagation()}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <MenuItem onClick={handleEdit}>Edit</MenuItem>
            <MenuItem onClick={handleDelete} sx={{ color: "error.main" }}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
            </MenuItem>
          </Menu>
        </Box>
      </Box>

      {/* title */}
      <Typography variant="h6" sx={{ fontSize: 16, fontWeight: 700, mt: 1 }}>
        {todo.title}
      </Typography>

      {/* description */}
      {description && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          {displayed}
          {isLong && (
            <Typography
              component="span"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded((s) => !s);
              }}
              sx={{
                ml: 0.5,
                cursor: "pointer",
                fontWeight: 600,
                fontSize: "0.75rem",
                color: "primary.main",
              }}
            >
              {expanded ? " Show less" : " Read more"}
            </Typography>
          )}
        </Typography>
      )}

      <Box display="flex" alignItems="center" justifyContent="space-between" mt={5}>
        <Box>
          <AvatarGroup
            max={3}
            sx={{
              "& .MuiAvatar-root": {
                width: 30,
                height: 30,
                fontSize: 12,
                border: "2px solid #fff",
              },
            }}
          >
            {(((todo as unknown as { avatars?: string[] }).avatars ?? []) as string[]).length > 0
              ? (((todo as unknown as { avatars?: string[] }).avatars ?? []) as string[])
                  .slice(0, 4)
                  .map((src, i) => (
                    <Tooltip key={src || i} title={`Member ${i + 1}`}>
                      <Avatar alt={`av-${i}`} src={src} />
                    </Tooltip>
                  ))
              : [
                  <Tooltip key="akshay" title="Akshay Busa">
                    <Avatar src={image3} sx={{ bgcolor: "grey.200", color: "text.secondary" }}>
                      Akshay
                    </Avatar>
                  </Tooltip>,
                  <Tooltip key="om" title="OM">
                    <Avatar src={image2} sx={{ bgcolor: "grey.200", color: "text.secondary" }}>
                      OM
                    </Avatar>
                  </Tooltip>,
                  <Tooltip key="ab" title="AB">
                    <Avatar src={image1} sx={{ bgcolor: "grey.200", color: "text.secondary" }}>
                      AB
                    </Avatar>
                  </Tooltip>,
                ]}
          </AvatarGroup>
        </Box>

        <Box display="flex" gap={2} alignItems="center" color="text.secondary">
          <Box display="flex" alignItems="center" gap={0.5}>
            <img src={chaticon} alt="comments" style={{ width: 16, height: 16, objectFit: "contain" }} />
            <Typography variant="caption">{todo.comments ?? 0}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5}>
            <img src={fileicon} alt="files" style={{ width: 16, height: 16, objectFit: "contain" }} />
            <Typography variant="caption">{todo.files ?? 0}</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default TodoCard;