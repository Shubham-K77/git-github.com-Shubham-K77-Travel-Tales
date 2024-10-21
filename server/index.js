import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import router from "./routes/index.js";
import { notFound, errorHandle } from "./middleware/error.js";

// Constants
const app = express();
dotenv.config();

// Middleware
app.use(
  cors({
    origin: "https://travel-tales-orpin.vercel.app", // Allow requests from your frontend
    credentials: true, // Allow cookies to be sent in requests
  })
);
app.use(cookieParser());
app.use(express.json());

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
