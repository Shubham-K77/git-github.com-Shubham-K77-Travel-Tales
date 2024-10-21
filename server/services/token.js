// Imports
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

// Constants
dotenv.config();
const secret = process.env.JWT_SECRET;

// Functions
const createToken = (req, res, userId) => {
  // Generate JWT token
  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
  // Set cookie with the generated token
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
  });

  return res.status(200).json({ message: "Token created and set in cookie." });
};

export { createToken };
