import React, { useState } from "react";
import AuthCard from "../components/AuthCard";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import { Typography, Stack, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function SignUp() {
  const auth = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      // Replace with real sign-up flow.
      await auth.login(email, password); // fake: log the user in after sign-up
    } catch (err: any) {
      setError(err?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Create account
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <InputField required label="Full name" value={name} onChange={(e) => setName(e.target.value)} />
          <InputField required label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField required label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <InputField required label="Confirm password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "Signing..." : "Sign up"}
          </PrimaryButton>
          {error && (
            <Typography color="error" variant="body2" sx={{ textAlign: "center" }}>
              {error}
            </Typography>
          )}
        </Stack>
      </form>

      <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
        <Typography variant="body2">Already have an account?</Typography>
        <Link component={RouterLink} to="/Login">
          Log in
        </Link>
      </Stack>
    </AuthCard>
  );
}
