import React from "react";
import { Paper, Typography, Box, Button } from "@mui/material";

type Props = {
  title: string;
  count?: number;
  color?: string;
  onAdd?: () => void;
  sx?: any;
};

export default function StatusCard({ title, count = 0, color = "#888", onAdd, sx = {} }: Props) {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `3px solid ${color}`,
        borderRadius: 2,
        p: 2,
        minHeight: 72,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        ...sx,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        • {title}
      </Typography>

      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
        <Typography variant="body2">{count}</Typography>
        {onAdd && (
          <Button size="small" onClick={onAdd}>
            +
          </Button>
        )}
      </Box>
    </Paper>
  );
}
