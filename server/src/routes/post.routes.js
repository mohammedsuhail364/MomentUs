import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/upload.middleware.js";
import { createPost, getPosts, savePost, toggleLike, unsavePost } from "../controllers/post.controller.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", protect, upload.single("file"), createPost);
router.patch("/:id/like", protect, toggleLike);
router.post("/:id/save", protect, savePost);
router.delete("/:id/save", protect, unsavePost);

export default router;
