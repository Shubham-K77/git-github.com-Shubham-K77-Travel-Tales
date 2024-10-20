import mongoose from "mongoose";
const { Schema } = mongoose;
const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title Of The Post Is Mandatory!"],
    },
    summary: {
      type: String,
      required: [true, "Summary Of The Post Is Mandatory!"],
    },
    content: {
      type: String,
      required: [true, "Content Of The Post Is Mandatory!"],
    },
    file: {
      type: String,
      required: [true, "Cover Of The Post Is Mandatory!"],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);
const postModel = mongoose.model("post", postSchema);
export default postModel;
