import { Schema, model, Document, Types } from "mongoose";

export type Priority = "Low" | "Medium" | "High";
export type TodoStatus = "todo" | "progress" | "review" | "done";

export interface TodoAttrs {
  title: string;
  description?: string;
  priority?: Priority;
  comments?: number;
  files?: number;
  status?: TodoStatus;
  completed?: boolean;
  owner: Types.ObjectId | string;
}

export interface TodoDocument extends TodoAttrs, Document {
  createdAt: Date;
  updatedAt: Date;
}

const todoSchema = new Schema<TodoDocument>(
  {
    title: { type: String, required: true },
    description: { type: String },
    priority: { type: String, enum: ["Low", "Medium", "High"], default: "Low" },
    comments: { type: Number, default: 0 },
    files: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["todo", "progress", "review", "done"],
      default: "todo"
    },
    completed: { type: Boolean, default: false },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

const Todo = model<TodoDocument>("Todo", todoSchema);

export default Todo;

