//Imports
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
//Constants
dotenv.config();
const secret = process.env.JWT_SECRET;
//Functions
const createToken = (req, res, userId) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: "1h" });
  //Payload Can Be ID or Whole User
  res.cookie("token", token, {
    httpOnly: true,
    secure: false, //Https
    sameSite: "none", //Allows CORS
    maxAge: 3600000, //1H
  });
};

export { createToken };
