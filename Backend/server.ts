import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import "express-async-errors";

import authRoutes from "./routes/auth";
import todoRoutes from "./routes/todos";
import { errorHandler } from "./middlewares/errorHandler";
import connectDB from "./config/db";

dotenv.config();

const app: Application = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// error handler (last)
app.use(errorHandler);

const DEFAULT_PORT = Number(process.env.PORT) || 4000;

const tryListen = (port: number) =>
  new Promise<void>((resolve, reject) => {
    const server = app.listen(port, () => {
      console.log(`Server running on port ${port}`);
      resolve();
    });

    server.on("error", (err) => {
      server.close();
      reject(err);
    });
  });

const start = async () => {
  try {
    await connectDB();
    let port = DEFAULT_PORT;
    const maxAttempts = 5;
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        await tryListen(port);
        return;
      } catch (err) {
        const code = (err as NodeJS.ErrnoException).code;
        if (code === "EADDRINUSE" && attempt < maxAttempts) {
          console.warn(
            `Port ${port} in use. Trying ${port + 1} (attempt ${attempt + 1}/${
              maxAttempts
            })`
          );
          port += 1;
          continue;
        }
        throw err;
      }
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Startup error:", message);
    process.exit(1);
  }
};

start();