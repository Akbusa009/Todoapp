import React from "react";
import { TextField } from "@mui/material";
import type { TextFieldProps } from "@mui/material/TextField";


type Props = Omit<TextFieldProps, "variant"> & { errorText?: string };

export default function InputField({ errorText, ...rest }: Props) {
  return (
    <TextField
      variant="outlined"
      fullWidth
      {...rest}
      helperText={errorText ?? rest.helperText}
      error={Boolean(errorText) || Boolean(rest.error)}
    />
  );
}
