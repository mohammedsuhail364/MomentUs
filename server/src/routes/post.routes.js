import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { createPost, getLikedPosts, getPost, getPosts, getSavedPosts, savePost, toggleLike, unsavePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
// static route first
router.get("/get-saved-posts", protect, getSavedPosts);
router.get("/get-liked-posts", protect, getLikedPosts);
// dynamic route after
router.get("/:postId([0-9a-fA-F]{24})", protect, getPost);
router.post("/", protect, upload.single("file"), createPost);
router.patch("/:id/like", protect, toggleLike);
router.post("/:id/save", protect, savePost);
router.delete("/:id/save", protect, unsavePost);


export default router;
