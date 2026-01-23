// models/User.js
import mongoose from "mongoose";

export default mongoose.model(
  "User",
  new mongoose.Schema(
    {
      name: String,
      username: { type: String, unique: true },
      email: { type: String, unique: true },
      password: String,
      bio: String,
      imageUrl: String,
      savedPosts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    },
    { timestamps: true }
  )
);

