import mongoose from "mongoose";

const emailChecker = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "The Name Must Be Provided!"],
    },
    email: {
      type: String,
      required: [true, "The Email Must Be Provided!"],
      unique: [true, "The Email Must Be Unique!"],
      validate: {
        validator: emailChecker,
        message: "Must Provide Valid Email",
      },
    },
    password: {
      type: String,
      required: [true, "The Password Must Be Provided!"],
    },
  },
  { timestamps: true }
);

// User model
const userModel = mongoose.model("Users", userSchema);
export default userModel;
