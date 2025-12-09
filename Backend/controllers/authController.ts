import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";

import User from "../models/User";

type SignupBody = { name?: string; email?: string; password?: string };
type LoginBody = { email?: string; password?: string };

const getJwtSecret = (): Secret => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT secret not configured");
  return secret;
};

const getJwtExpiresIn = (): SignOptions["expiresIn"] =>
  (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"];

export const signup = async (
  req: Request<unknown, unknown, SignupBody>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      getJwtSecret(),
      { expiresIn: getJwtExpiresIn() }
    );

    return res.status(200).json({ token, user });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Signup error:", message);
    return res.status(500).json({ message: "Signup failed" });
  }
};

export const login = async (
  req: Request<unknown, unknown, LoginBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name },
      getJwtSecret(),
      { expiresIn: getJwtExpiresIn() }
    );

    return res.status(200).json({ token, user });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Login error:", message);
    return res.status(500).json({ message: "Login failed" });
  }
};

