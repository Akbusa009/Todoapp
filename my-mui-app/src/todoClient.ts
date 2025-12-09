import client from "./api";

export interface TodoPayload {
  title: string;
  description?: string;
  priority?: "Low" | "Medium" | "High";
  status?: "todo" | "progress" | "review" | "done";
  comments?: number;
  files?: number;
  completed?: boolean;
  createdAt?: string;
}

export interface Todo extends TodoPayload {
  _id: string;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
}

// fetch all todos for current user
export const fetchTodos = async (): Promise<Todo[]> => {
  const res = await client.get("/todos");
  return res.data;
};

export const createTodo = async (payload: TodoPayload): Promise<Todo> => {
  try {
    const res = await client.post("/todos", payload);
    return res.data;
  } catch (err: unknown) {
    if (typeof err === "object" && err && "response" in err) {
      const anyErr = err as { response?: { status?: number; data?: unknown } };
      console.error(
        "createTodo error response:",
        anyErr.response?.status,
        anyErr.response?.data
      );
    }
    throw err;
  }
};

// update
export const updateTodo = async (
  id: string,
  payload: Partial<TodoPayload>
): Promise<Todo> => {
  const res = await client.put(`/todos/${id}`, payload);
  return res.data;
};

// delete
export const deleteTodo = async (id: string): Promise<{ message: string }> => {
  const res = await client.delete(`/todos/${id}`);
  return res.data;
};