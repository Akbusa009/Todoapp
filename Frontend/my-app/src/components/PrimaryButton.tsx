import React from "react";
import { Button } from "@mui/material";
import type { ButtonProps } from "@mui/material/Button";

 
export default function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ borderRadius: 2, py: 1.5, textTransform: "uppercase" }}
      {...props}
    />
  );
}
