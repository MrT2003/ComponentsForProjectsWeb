import asyncHandler from 'express-async-handler';
import Comment from "../Models/CommentModel.js";
// Create a new comment
export const createComment = asyncHandler(async (req, res) => {
  const { movieId, text } = req.body;
  const userId = req.user._id;

  try {
    const newComment = await Comment.create({
      userId,
      movieId,
      text,
    });
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get comments for a specific movie
export const getComments = asyncHandler(async (req, res) => {
  const { movieId } = req.params;

  try {
    const comments = await Comment.find({ movieId }).populate("userId", "name");
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a comment
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;

  try {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
