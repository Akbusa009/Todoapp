import React from "react";
import { Container, Box } from "@mui/material";

type Props = { children: React.ReactNode; maxWidth?: "sm" | "md" | "lg" | "xl" | false };

export default function Layout({ children, maxWidth = "lg" }: Props) {
  return (
    <Container maxWidth={maxWidth}>
      <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", py: 6 }}>{children}</Box>
    </Container>
  );
}
