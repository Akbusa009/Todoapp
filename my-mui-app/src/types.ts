export type TodoStatus = "todo" | "progress" | "review" | "done";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  priority?: "Low" | "Medium" | "High";
  comments?: number;
  files?: number;
  status: TodoStatus;
  completed?: boolean;
}