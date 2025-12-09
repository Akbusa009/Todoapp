import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, _next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  const status = (err as { status?: number }).status || 500;
  const message = (err as Error).message || "Internal Server Error";
  res.status(status).json({ message });
};

