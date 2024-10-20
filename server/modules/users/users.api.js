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

// Retreive The User's In The Platform
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

// Register route => Signup! Functionality
userRouter.post("/register", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    // Check if credentials are missing
    if (!name || !email || !password) {
      let error = new Error("The Credentials Are Missing");
      error.status = 400; // Bad Request
      return next(error);
    }
    // Check if email already exists in the database
    const emailExists = await userModel.findOne({ email });
    if (emailExists) {
      let error = new Error("Email Already Exists In The DB!");
      error.status = 400; // Bad Request
      return next(error);
    }
    // Encrypt the password
    const encryptedPassword = await encrypt(password);
    const newUser = { name, email, password: encryptedPassword };
    // Create the new user
    const query = await userModel.create(newUser);
    if (!query) {
      let error = new Error("Internal Error! DB Error!");
      error.status = 500; // Internal Server Error
      return next(error);
    }
    // Respond with user creation success
    res.status(201).send({ message: "User Created!" });
    //Send The Mail To The User
    await mailer({ userMail: email, subject: "newuser" });
  } catch (error) {
    error.message = "Internal Error!";
    error.status = 500; // Internal Server Error
    next(error);
  }
});

//Login Functionality
userRouter.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      let error = new Error(
        "The Email Or Password Is Missing! Credentials Missing!"
      );
      res.status(400);
      return next(error);
    }
    //Checking Email Exists Or Not!
    const emailExists = await userModel.findOne({ email });
    if (!emailExists) {
      let error = new Error("The Email Used Doesn't Exists In The DB!");
      res.status(400);
      return next(error);
    }
    //Now Email Exists Then Check The Password For The User:
    const isValid = await decrypt(password, emailExists.password);
    if (!isValid) {
      let error = new Error("The Entered Password Is Invalid For The User!");
      res.status(400);
      return next(error);
    }
    //Now Both The UserName And Password Is Valid! Assign Token To The Users
    createToken(req, res, emailExists._id);
    res.status(200).send({ message: "Your LoggedIn To The Platform!" });
  } catch (error) {
    error.message = "Sorry! Internal Error!";
    res.status(500);
    next(error); //Error Handling
  }
});

//Profile Get Of The Users From The Cookies
userRouter.get("/fetchCookie", async (req, res, next) => {
  try {
    // Access the token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ userData: null, message: "No token found" });
    }
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ userData: null, message: "Invalid token" });
    }
    // Fetch the user by decoded token data (assuming decoded.userId contains the user's ID)
    const user = await userModel.findById(decoded.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ userData: null, message: "User not found" });
    }
    // Send the user data to the client
    res.status(200).json({ userData: user });
  } catch (error) {
    console.error("Internal Error: ", error);
    res.status(500);
    next(error); // Pass the error to error-handling middleware
  }
});

//Edit Profile Must Have LoggedIn Check Cookies!
userRouter.put("/update", (req, res, next) => {});

//Logout Functionality
userRouter.post("/logout", (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: false, //http
      maxAge: 0, //0s
    });
    res.status(200).send({ message: "Logged Out! Successfully!" });
    //Destroy The Cookie By Replacing The Value
  } catch (error) {
    error.message = "Internal Error! Server Error";
    res.status(500); //Internal Error
    next(error); //Error Handling Middleware
  }
});

export default userRouter;

//Function To Retrieve The Mail-Address From Id
export const getUserEmailById = async (userId) => {
  const user = await userModel.findById(userId).select("email");
  if (!user) {
    throw new Error("User not found");
  }
  return user.email;
};
