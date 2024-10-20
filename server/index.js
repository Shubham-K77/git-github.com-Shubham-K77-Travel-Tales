import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/index.js";
import { notFound, errorHandle } from "./middleware/error.js";
import { fileURLToPath } from "url";
import { dirname } from "path"; // Add this line
import path from "path"; // Add this line

// Constants
const app = express();
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

// Serve static files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/", router);
app.use(notFound);
app.use(errorHandle);

// Database Connection
const connection = process.env.ConnectionUrl;
const port = process.env.PORT;

mongoose
  .connect(connection)
  .then(() => {
    app.listen(port, () => {
      console.log("Connected To DB!");
      console.log(`App Is Running On The Port: ${port}`);
      console.log(`URL => http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

export default app;
