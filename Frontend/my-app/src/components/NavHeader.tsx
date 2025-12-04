import React from "react";
import { Box, Typography, Stack } from "@mui/material";

type Props = {
  title?: string;
  subtitle?: string;
  left?: React.ReactNode;
  right?: React.ReactNode;
};

export default function NavHeader({ title, subtitle, left, right }: Props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 4 }}>
      <Box>
        <Typography variant="h4" fontWeight={800}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      <Stack direction="row" spacing={2} alignItems="center">
        {left}
        {right}
      </Stack>
    </Box>
  );
}
