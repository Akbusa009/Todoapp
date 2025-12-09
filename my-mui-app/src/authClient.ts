import client, { setAuthToken } from "./api";

export interface UserData {
  id: string;
  email: string;
  name: string;
}

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const saveAuth = (token: string, user: UserData) => {
  localStorage.setItem("auth_token", token);
  localStorage.setItem("auth_user", JSON.stringify(user));
  setAuthToken(token); 
};

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  setAuthToken(undefined);
};

export const getStoredToken = () => localStorage.getItem(TOKEN_KEY);
export const getStoredUser = (): UserData | null => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};


export const signup = async (name: string, email: string, password: string) => {
  const res = await client.post("/auth/signup", { name, email, password });
  const { token, user } = res.data;
  saveAuth(token, user);
  return user as UserData;
};


export const login = async (email: string, password: string) => {
  const res = await client.post("/auth/login", { email, password });
  const { token, user } = res.data;
  saveAuth(token, user);
  return user as UserData;
};


export const logout = () => {
  clearAuth();
};