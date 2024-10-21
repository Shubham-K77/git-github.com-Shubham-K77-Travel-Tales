// Imports
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../modules/users/users.model.js";

// Constants
dotenv.config();
const secret = process.env.JWT_SECRET;

// Protect Middleware
const protect = async (req, res, next) => {
  // Check for Cookie
  const token = req.cookies.token; // Token is named for the cookie
  if (!token) {
    const error = new Error("Invalid Access! No Token!");
    res.status(403); // Forbidden
    return next(error); // Error Middleware
  }

  // If Cookie Found
  try {
    const decoded = jwt.verify(token, secret);

    // Fetch user from the database
    req.user = await userModel.findById(decoded.userId).select("-password");

    // Check if user exists
    if (!req.user) {
      const error = new Error("User not found!");
      res.status(404); // Not Found
      return next(error); // Error Middleware
    }

    next(); // Store the data in request as user! Now if you want to access the user data currently logged in, simply use req.user
  } catch (error) {
    // Enhanced error handling
    console.error("Token processing error:", error); // Log the error for debugging
    if (error.name === "JsonWebTokenError") {
      res.status(401).send({ message: "Unauthorized! Invalid token." }); // Unauthorized
    } else if (error.name === "TokenExpiredError") {
      res.status(401).send({ message: "Unauthorized! Token expired." }); // Unauthorized
    } else {
      const internalError = new Error(
        "Internal Error! Failed To Process Token!"
      );
      res.status(500); // Internal Server Error
      return next(internalError); // Error Middleware
    }
  }
};

export default protect;
