// controllers/post.controller.js
import Post from "../models/Post.js";
import cloudinary from "../config/cloudinary.js";

import fs from "fs";
import mongoose from "mongoose";
import User from "../models/User.js";
export const createPost = async (req, res) => {
  try {
    // 1. Validate file
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // 2. Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "posts",
    });

    // 3. Clean temp file (VERY IMPORTANT)
    fs.unlinkSync(req.file.path);

    // 4. Create post
    const post = await Post.create({
      creator: req.user._id,
      caption: req.body.caption?.trim() || "",
      imageUrl: uploadResult.secure_url,
      location: req.body.location || "",
      tags: req.body.tags
        ? req.body.tags.split(",").map(t => t.trim())
        : [],
    });

    // 5. Respond
    res.status(201).json(post);
  } catch (err) {
    console.error("Create post failed:", err);

    // Ensure temp file cleanup on failure
    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      message: "Failed to create post",
    });
  }
};


export const getPosts = async (_, res) => {
  const posts = await Post.find().sort("-createdAt").populate("creator");  
  res.json(posts);
};

// PATCH /posts/:id/like  (toggle)
export const toggleLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const alreadyLiked = post.likes.some((u) => u.toString() === userId.toString());

    if (alreadyLiked) {
      post.likes = post.likes.filter((u) => u.toString() !== userId.toString());
    } else {
      post.likes.push(userId);
    }

    await post.save();

    return res.json({
      postId: post._id,
      liked: !alreadyLiked,
      likesCount: post.likes.length,
    });
  } catch (err) {
    console.error("Toggle like failed:", err);
    return res.status(500).json({ message: "Failed to toggle like" });
  }
};

// POST /posts/:id/save  (save)
export const savePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const postExists = await Post.exists({ _id: id });
    if (!postExists) return res.status(404).json({ message: "Post not found" });

    // $addToSet prevents duplicates
    const user = await User.findByIdAndUpdate(
      userId,
      { $addToSet: { savedPosts: id } },
      { new: true }
    ).select("savedPosts");
    
    return res.json({
      postId: id,
      saved: true,
      savedCount: user.savedPosts.length,
    });
  } catch (err) {
    console.error("Save post failed:", err);
    return res.status(500).json({ message: "Failed to save post" });
  }
};

// DELETE /posts/:id/save  (unsave)
export const unsavePost = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid post id" });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { savedPosts: id } },
      { new: true }
    ).select("savedPosts");

    return res.json({
      postId: id,
      saved: false,
      savedCount: user.savedPosts.length,
    });
  } catch (err) {
    console.error("Unsave post failed:", err);
    return res.status(500).json({ message: "Failed to unsave post" });
  }
};
