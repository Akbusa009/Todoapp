import React from "react";
import { Paper, Box } from "@mui/material";

type Props = { children: React.ReactNode; sx?: BoxProps["sx"] };

export default function AuthCard({ children, sx = {} }: Props) {
  return (
    <Box sx={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center", px: 2, ...sx }}>
      <Paper elevation={3} sx={{ width: "100%", maxWidth: 520, p: 4, borderRadius: 3, ...sx }}>
        {children}
      </Paper>
    </Box>
  );
}