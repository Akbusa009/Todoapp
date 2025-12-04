import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const auth = useAuth();
  if (!auth.token) {
    return <Navigate to="/" replace />;
  }
  return children;
}
