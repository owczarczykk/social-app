import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { getPosts, getUserPosts, likePost } from "./../controllers/post.js";

const router = express.Router();

router.get("/", verifyToken, getPosts);
router.get("/:id/posts", verifyToken, getUserPosts);

router.patch("/:id/like", verifyToken, likePost);
export default router;
