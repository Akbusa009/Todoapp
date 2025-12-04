import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material"; 

export const getTheme = (mode: PaletteMode = "light") =>
  createTheme({
    palette: {
      mode,
      primary: { main: "#4f46e5" },
      background: { default: "#f6f7fb", paper: "#fff" },
      text: { primary: "#0f172a" }
    },
    shape: { borderRadius: 12 },
    components: {
      MuiCard: { defaultProps: { elevation: 0 } }
    }
  });