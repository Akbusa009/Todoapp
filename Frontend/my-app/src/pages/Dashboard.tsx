import React from "react";
import Layout from "../components/Layout";
import NavHeader from "../components/NavHeader";
import StatusCard from "../components/StatusCard";
import { Box, Button } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FilterListIcon from "@mui/icons-material/FilterList";
import { useAuth } from "../auth/AuthProvider";

export default function Dashboard() {
  const auth = useAuth();

  return (
    <Layout maxWidth="lg">
      <NavHeader
        title="Todo App"
        subtitle="Project"
        left={
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Button startIcon={<FilterListIcon />} variant="outlined">
              All priorities
            </Button>
            <Button variant="outlined">All dates</Button>
          </Box>
        }
        right={
          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <div style={{ fontSize: 14 }}>{auth.user?.name}</div>
            <Button variant="outlined" startIcon={<LogoutIcon />} onClick={auth.logout}>
              Logout
            </Button>
          </Box>
        }
      />

      {/* status columns */}
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 4 }}>
        <StatusCard title="To Do" color="#7b46f7" onAdd={() => console.log("add todo")} />
        <StatusCard title="On Progress" color="#f2a007" />
        <StatusCard title="Review" color="#00a7c7" />
        <StatusCard title="Done" color="#16a34a" />
      </Box>
    </Layout>
  );
}