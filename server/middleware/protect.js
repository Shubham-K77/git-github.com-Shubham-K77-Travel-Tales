//Imports
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import userModel from "../modules/users/users.model.js";
//Constants
dotenv.config();
const secret = process.env.JWT_SECRET;
//Protect Middleware
const protect = async (req, res, next) => {
  //Check For Cookie
  const token = req.cookies.token; //token is named for the cookie
  if (!token) {
    const error = new Error("Invalid Access! No Token!");
    res.status(403); //Forbidden
    return next(error); //Error Middleware
  }
  //If Cookie Found
  try {
    const decoded = jwt.verify(token, secret);
    req.user = await userModel.findById(decoded.userId).select("-password");
    next(); //Store The Data In Request As User! Now If You Want To Access The User Data Currently Logged In Simply Use Req.user
  } catch (error) {
    error.message("Internal Error! Failed To Process Token!");
    res.status(500);
    next(error);
  }
};
export default protect;