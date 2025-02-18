import express from "express";
import {
  addComment,
  deleteComment,
  editComment,
  getComments,
} from "../controllers/CommentController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add a new comment to a video (requires authentication)
router.post("/", auth, addComment);

// Get all comments for a specific video
router.get("/:videoId", getComments);

// Edit a specific comment (requires authentication)
router.put("/:commentId", auth, editComment);

// Delete a specific comment (requires authentication)
router.delete("/:commentId", auth, deleteComment);

export default router;
