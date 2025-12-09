import React, { useState } from "react";
import { Container, Box, Typography, TextField, Button, Alert } from "@mui/material";
import { signup } from "../authClient"
import { useNavigate, Link as RouterLink } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email.trim() || !password) {
      setError("Please fill all required fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      await signup(name.trim(), email.trim(), password);
      navigate("/", { replace: true });
    } catch {
      setError("Signup failed. Try a different email or later.");
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, p: 4, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>Create account</Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <form onSubmit={handleSubmit}>
          <TextField label="Full name" fullWidth required margin="normal" value={name} onChange={e => setName(e.target.value)} />
          <TextField label="Email" fullWidth required margin="normal" type="email" value={email} onChange={e => setEmail(e.target.value)} />
          <TextField label="Password" fullWidth required margin="normal" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <TextField label="Confirm password" fullWidth required margin="normal" type="password" value={confirm} onChange={e => setConfirm(e.target.value)} />

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Sign up</Button>
        </form>

        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2">
            Already have an account? <RouterLink to="/login">Log in</RouterLink>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Signup;