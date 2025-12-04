import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type User = { name: string } | null;
type AuthContextType = {
  user: User;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

// Fake sign-in (replace with real API)
const fakeSignIn = (email: string, password: string) =>
  new Promise<{ token: string; user: { name: string } }>((res, rej) => {
    setTimeout(() => {
      if (email && password) res({ token: "fake-token-123", user: { name: "ak11" } });
      else rej(new Error("Invalid credentials"));
    }, 500);
  });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [user, setUser] = useState<User>(() => {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const login = async (email: string, password: string) => {
    const result = await fakeSignIn(email, password);
    setToken(result.token);
    setUser(result.user);
    navigate("/app", { replace: true });
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/", { replace: true });
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
}
