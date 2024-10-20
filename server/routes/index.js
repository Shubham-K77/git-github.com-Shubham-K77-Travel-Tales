import express from "express";
import userRouter from "../modules/users/users.api.js";
import postRouter from "../modules/post/posts.api.js";
const router = express.Router();
//User Router
router.use("/api/v1/users", userRouter);
router.use("/api/v1/posts", postRouter);
export default router;
