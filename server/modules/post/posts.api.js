import express from "express";
import multer from "multer";
import cloudinary from "../../config/cloudinary.js";
import postModel from "./posts.model.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import mailer from "../../services/mailer.js";
import { getUserEmailById } from "../users/users.api.js";
dotenv.config();
const uploadMW = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
});
const postRouter = express.Router();
const secret = process.env.JWT_SECRET;
// ROUTING PATHS =>
// Get posts
postRouter.get("/", async (req, res, next) => {
  try {
    const token = req.cookies.token;
    let author = null;
    if (token) {
      const decoded = jwt.verify(token, secret);
      author = decoded.userId;
    }
    let data;
    if (!author) {
      // Fetch 5 random posts if user not authenticated
      data = await postModel
        .aggregate([{ $sample: { size: 5 } }]) // Returns 5 random posts
        .populate("author", "name") // Populate author name if needed
        .sort({ createdAt: -1 });
    } else {
      // Fetch user's posts
      data = await postModel
        .find({ author })
        .populate("author", "name")
        .sort({ createdAt: -1 });
      // If no posts, fetch random posts
      if (data.length === 0) {
        data = await postModel
          .aggregate([{ $sample: { size: 5 } }])
          .populate("author", "name")
          .sort({ createdAt: -1 });
      }
    }
    if (!data || data.length === 0) {
      return res.status(404).send({ message: "No Posts Found!" });
    }
    res.status(200).send({ data });
  } catch (error) {
    error.message = "Internal Error!";
    res.status(500);
    next(error);
  }
});

// Create a new post
postRouter.post("/create", uploadMW.single("file"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "File is required!" });
    }
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "No token found" });
    }
    const decoded = jwt.verify(token, secret);
    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const userId = decoded.userId;
    const { title, summary, content } = req.body;
    if (!title || !summary || !content) {
      return res.status(400).send({ message: "All fields must be filled!" });
    }
    // Upload image to Cloudinary
    const uploadStream = cloudinary.v2.uploader.upload_stream(
      async (error, uploadResponse) => {
        if (error) {
          console.error("Cloudinary Upload Error:", error);
          return res.status(500).send({ message: "Cloudinary upload failed!" });
        }
        // Create post after successful image upload
        const post = await postModel.create({
          title,
          summary,
          content,
          file: uploadResponse.secure_url,
          author: userId,
        });
        if (!post) {
          return res.status(500).send({ message: "Error creating post!" });
        }
        res.status(201).send({ message: "Post successfully created!" });
        // Send email (non-blocking)
        try {
          const mail = await getUserEmailById(userId);
          await mailer({
            userMail: mail,
            subject: "newpost",
            blogTitle: title,
          });
        } catch (error) {
          console.error("Email sending failed:", error.message);
        }
      }
    );
    // End the Cloudinary upload stream
    uploadStream.end(req.file.buffer);
  } catch (error) {
    error.message = "Internal Error!";
    res.status(500);
    next(error);
  }
});

// UPDATE POST WITH ID:
postRouter.put("/edit/:id", uploadMW.single("file"), async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateFields = {
      title: req.body.title,
      summary: req.body.summary,
      content: req.body.content,
      author: req.body.author,
    };

    if (req.file) {
      // Upload image to Cloudinary
      const uploadResponse = await cloudinary.v2.uploader.upload(req.file.path);
      updateFields.file = uploadResponse.secure_url; // Use the URL from Cloudinary
    }

    const post = await postModel.findOneAndUpdate({ _id: id }, updateFields, {
      new: true,
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found or you do not have permission to edit it.",
      });
    }

    res.status(200).send({ message: "Successfully Updated!" });
    const mail = await getUserEmailById(userId);
    await mailer({
      userMail: mail,
      subject: "editpost",
      blogTitle: updateFields.title,
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).send({ message: "Internal Error!" });
    next(error);
  }
});

// GET POST WITH ID:
postRouter.get("/post/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await postModel.findById(id).populate("author", "name");
    if (!data) {
      const error = new Error("ID INVALID!");
      error.status = 400;
      return next(error);
    }
    res.status(200).send({ data });
  } catch (error) {
    error.message = "Unable To Fetch! Internal Error!";
    error.status = 500;
    next(error);
  }
});

// DELETE POST WITH ID:
postRouter.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      const error = new Error("ID Missing!");
      error.status = 400;
      return next(error);
    }
    const data = await postModel.deleteOne({ _id: id });
    if (data.deletedCount === 0) {
      const error = new Error("Deletion Failed! No post found with this ID.");
      error.status = 404;
      return next(error);
    }
    res.status(200).send({ message: "Post Deleted!" });
    const mail = await getUserEmailById(userId);
    await mailer({ userMail: mail, subject: "deletepost", blogTitle: "" });
  } catch (error) {
    error.message = "Internal Error!";
    res.status(500);
    next(error);
  }
});

export default postRouter;
