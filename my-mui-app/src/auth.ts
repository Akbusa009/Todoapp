export interface UserData {
  name: string;
  email: string;
  password: string;
}

const USERS_KEY = "users";
const AUTH_KEY = "auth_user";

export const getUsers = (): UserData[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) as UserData[] : [];
  } catch {
    return [];
  }
};

export const saveUser = (user: UserData) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUser = (email: string) => {
  return getUsers().find(u => u.email.toLowerCase() === email.toLowerCase());
};

export const signIn = (email: string, password: string): boolean => {
  const u = findUser(email);
  if (!u) return false;
  if (u.password !== password) return false;
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email: u.email, name: u.name }));
  return true;
};

export const signOut = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const signUp = (user: UserData): boolean => {
  if (findUser(user.email)) return false;
  saveUser(user);
  localStorage.setItem(AUTH_KEY, JSON.stringify({ email: user.email, name: user.name }));
  return true;
};

export const getCurrentUser = (): { email: string; name: string } | null => {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
};