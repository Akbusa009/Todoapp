export type TodoStatus = "todo" | "progress" | "review" | "done";

export interface Todo {
  _id: string;
  title: string;
  description?: string;
  priority?: "Low" | "Medium" | "High";
  comments?: number;
  files?: number;
  status: TodoStatus;
  avatars?: string[]; 
  createdAt?: string;
  updatedAt?: string;
}
