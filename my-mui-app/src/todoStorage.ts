import type { Todo } from "./types";
import { getCurrentUser } from "./auth";

export const getStorageKey = () => {
  const user = getCurrentUser();
  return user ? `tasks_${user.email}` : "tasks_guest";
};

export const loadTodos = (): Todo[] => {
  const key = getStorageKey();
  const raw = localStorage.getItem(key);
  return raw ? JSON.parse(raw) : [];
};

export const saveTodos = (todos: Todo[]) => {
  const key = getStorageKey();
  localStorage.setItem(key, JSON.stringify(todos));
};
