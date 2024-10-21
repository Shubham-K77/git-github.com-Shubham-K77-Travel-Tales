import express from "express";
import userModel from "./users.model.js";
import { encrypt, decrypt } from "../../services/encrypter.js";
import { createToken } from "../../services/token.js";
import protect from "../../middleware/protect.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mailer from "../../services/mailer.js";

dotenv.config();
const userRouter = express.Router();

// Fetch all users
userRouter.get("/", protect, async (req, res, next) => {
  try {
    let data = await userModel.find();
    if (!data.length) {
      return res.status(200).send({ message: "No users found", data: [] });
    }
    res.status(200).send({ data });
  } catch (error) {
    error.message = "Internal Server Error while fetching users!";
    res.status(500);
    next(error);
  }
});

// Register route
userRouter.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({ message: "Credentials are missing" });
    }

    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      return res.status(400).send({ message: "Email already exists" });
    }

    const encryptedPassword = await encrypt(password);
    const newUser = { name, email, password: encryptedPassword };
    const query = await userModel.create(newUser);

    if (!query) {
      return res.status(500).send({ message: "Internal Error! DB Error!" });
    }

    res.status(201).send({ message: "User Created!" });
    await mailer({ userMail: email, subject: "newuser" });
  } catch (error) {
    error.message = "Internal Error!";
    error.status = 500;
    next(error);
  }
});

// Login route
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email or password is missing" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "Email does not exist" });
    }

    const isValidPassword = await decrypt(password, user.password);
    if (!isValidPassword) {
      return res.status(400).send({ message: "Invalid password" });
    }

    createToken(req, res, user._id);
    res.status(200).send({ message: "Logged in successfully!" });
  } catch (error) {
    error.message = "Internal Error!";
    res.status(500);
    next(error);
  }
});

// Fetch profile using token
userRouter.get("/fetchCookie", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .send({ userData: null, message: "No token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userData = await userModel.findOne({ _id: decoded });
    if (!userData) {
      return res.status(400).send({ message: "User not found" });
    }

    res.status(200).send({ userData, message: "Fetched user successfully!" });
  } catch (error) {
    error.message = "Error fetching user!";
    res.status(500);
    next(error);
  }
});

export default userRouter;
