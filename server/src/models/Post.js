// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    caption: { type: String, trim: true, maxlength: 2200, default: "" },
    imageUrl: { type: String, required: true },
    location: { type: String, trim: true, maxlength: 200, default: "" },
    tags: [{ type: String, trim: true }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

// helpful indexes
postSchema.index({ creator: 1, createdAt: -1 });

export default mongoose.model("Post", postSchema);
