import Post from "../models/Post.js";
import User from "../models/User.js";

/**
 * GET /api/users/me
 */
export const getMe = async (req, res) => {
  res.json(req.user);
};

/**
 * GET /api/users/:id
 */
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  const posts = await Post.find({ creator: req.params.id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  const userAndPosts=user.toObject();
  userAndPosts.posts=posts
  res.json(userAndPosts);
};

/**
 * GET /api/users
 */
export const getUsers = async (req, res) => {
  const limit = Number(req.query.limit) || 0;

  const users = await User.find()
    .select("-password")
    .sort({ createdAt: -1 })
    .limit(limit);

  res.json(users);
};

/**
 * PATCH /api/users/me
 */
export const updateMe = async (req, res) => {
  const { name, bio, imageUrl } = req.body;

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.name = name ?? user.name;
  user.bio = bio ?? user.bio;
  user.imageUrl = imageUrl ?? user.imageUrl;

  const updatedUser = await user.save();

  res.json(updatedUser);
};
