import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  getPosts,
  getUserPosts,
  likePost,
  addComment,
} from "./../controllers/post.js";

const router = express.Router();

router.get("/", verifyToken, getPosts);
router.get("/:id", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);

router.patch("/:id/comment", verifyToken, addComment);
export default router;
