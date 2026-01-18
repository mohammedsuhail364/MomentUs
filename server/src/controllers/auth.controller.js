// controllers/auth.controller.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

export const register = async (req, res) => {
  const { name, email, password, username } = req.body;

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    username,
    password: hashed,
  });

  res.json({ token: generateToken(user._id), user });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    return res.status(401).json({ message: "Invalid credentials" });

  res.json({ token: generateToken(user._id), user });
};
