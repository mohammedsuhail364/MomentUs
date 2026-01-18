// models/Post.js
import mongoose from "mongoose";

export default mongoose.model(
  "Post",
  new mongoose.Schema(
    {
      creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      caption: String,
      imageUrl: String,
      location: String,
      tags: [String],
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    },
    { timestamps: true }
  )
);
