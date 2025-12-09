import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { logout, getStoredUser } from "../authClient";
import Typography from "@mui/material/Typography";

const BlankNavbar: React.FC = () => {
  const navigate = useNavigate();
  const user = getStoredUser();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      color="transparent"
      sx={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", bgcolor: "#FFFFFF"}}>
        {/* Left side empty */}
        <Box />

        {/* Right side */}
        <Box display="flex" alignItems="center" gap={2}>
          {user && (
            <Typography
              sx={{ color: "#333", fontSize: "0.9rem" }}
            >
              {user.name}
            </Typography>
          )}

          <Button
            variant="outlined"
            color="error"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default BlankNavbar;
