import express from "express";
import { createComment, getComments, deleteComment } from "../Controllers/CommentController.js";
import { protect, admin } from '../middlewares/Auth.js';

const router = express.Router();

// Create a new comment
router.post("/", protect, createComment);

// Get comments for a specific movie
router.get("/:movieId", protect, getComments);

// Delete a comment
router.delete("/:commentId", protect, admin, deleteComment);

export default router;
