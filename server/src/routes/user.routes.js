import express from "express";
import {
  getMe,
  getUserById,
  getUsers,
  updateMe,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// current user
router.get("/me", protect, getMe);
router.patch("/me", protect, updateMe);

// public / protected reads
router.get("/", getUsers);
router.get("/:id", getUserById);

export default router;
