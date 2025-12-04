import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { Typography, Stack, Link, Box } from "@mui/material";
import { Link as RouterLink, Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // if already logged in, redirect
  if (auth.token) return <Navigate to="/app" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await auth.login(email, password);
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Welcome back
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <InputField required label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField required label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Logging..." : "Log in"}
          </PrimaryButton>
          {error && (
            <Typography color="error" variant="body2" sx={{ textAlign: "center" }}>
              {error}
            </Typography>
          )}
        </Stack>
      </Box>

      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Typography variant="body2">Don't have an account?</Typography>
        <Link component={RouterLink} to="/signup">
          Sign up
        </Link>
      </Stack>
    </AuthCard>
  );
}