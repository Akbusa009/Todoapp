import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import { toast } from "react-toastify";
import { login } from "../authClient"
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.warning("Please fill both fields.");
      return;
    }
    try {
      await login(email.trim(), password);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1000);
    } catch {
      toast.error("Invalid credentials. Try again or sign up.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, p: 4, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Welcome back</Typography>

        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth required margin="normal" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password" fullWidth required margin="normal" type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Log in</Button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don't have an account? <RouterLink to="/signup">Sign up</RouterLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;