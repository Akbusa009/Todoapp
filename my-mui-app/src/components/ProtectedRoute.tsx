import React from "react";
import { Navigate } from "react-router-dom";
import { getStoredUser } from "../authClient";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const user = getStoredUser();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;