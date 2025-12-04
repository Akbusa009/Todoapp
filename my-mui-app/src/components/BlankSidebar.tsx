import React from "react";
import Box from "@mui/material/Box";

const BlankSidebar: React.FC = () => {
  return (
    <Box
      sx={{
        width: 260,
        background: "transparent",
        borderRight: "1px solid rgba(15,23,42,0.04)",
        padding: 2,
        boxSizing: "border-box",
      }}
    >
    </Box>
  );
};

export default BlankSidebar;