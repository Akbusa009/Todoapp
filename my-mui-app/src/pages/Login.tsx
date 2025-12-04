import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";
import { login } from "../authClient"
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) {
      setError("Please fill both fields.");
      return;
    }
    try {
      await login(email.trim(), password);
      navigate("/", { replace: true });
    } catch {
      setError("Invalid credentials. Try again or sign up.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 10, p: 4, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Welcome back</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField label="Email" fullWidth required margin="normal" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password" fullWidth required margin="normal" type="password" value={password} onChange={e => setPassword(e.target.value)} />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Log in</Button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Don’t have an account? <RouterLink to="/signup">Sign up</RouterLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
