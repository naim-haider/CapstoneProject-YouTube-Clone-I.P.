import express from "express";
import {
  createVideo,
  getAllVideos,
  getVideo,
  getRelatedVideos,
  getNonRelatedVideos,
  editVideo,
  deleteVideo,
  toggleLikeDislikeVideo,
} from "../controllers/VideoController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a new video (requires authentication)
router.post("/", auth, createVideo);

// Get all videos
router.get("/", getAllVideos);

// Get a specific video
router.get("/:videoId", getVideo);

// Edit a video (requires authentication)
router.put("/:videoId", auth, editVideo);

// Get related videos based on category
router.get("/:videoId/related", getRelatedVideos);

// Get videos that do not match the category of the given video
router.get("/:videoId/non-reated-video", getNonRelatedVideos);

// Toggle like/dislike on a video
router.post("/:videoId/like-dislike", auth, toggleLikeDislikeVideo);

// Delete a video (requires authentication)
router.delete("/:videoId", auth, deleteVideo);

export default router;
