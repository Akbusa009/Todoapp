import { Schema, model, Document } from "mongoose";

export interface UserAttrs {
  name: string;
  email: string;
  password: string;
}

export interface UserDocument extends UserAttrs, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

const User = model<UserDocument>("User", userSchema);

export default User;

