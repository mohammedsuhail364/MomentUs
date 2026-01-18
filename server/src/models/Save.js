// models/Save.js
import mongoose from "mongoose";

export default mongoose.model(
  "Save",
  new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  })
);
