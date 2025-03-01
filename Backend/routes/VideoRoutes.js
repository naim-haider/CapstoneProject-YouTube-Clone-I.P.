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
router.post("/videos/", auth, createVideo);

// Get all videos
router.get("/videos/", getAllVideos);

// Get a specific video
router.get("/videos/:videoId", getVideo);

// Edit a video (requires authentication)
router.put("/videos/:videoId", auth, editVideo);

// Get related videos based on category
router.get("/videos/:videoId/related", getRelatedVideos);

// Get videos that do not match the category of the given video
router.get("/videos/:videoId/non-reated-video", getNonRelatedVideos);

// Toggle like/dislike on a video
router.post("/videos/:videoId/like-dislike", auth, toggleLikeDislikeVideo);

// Delete a video (requires authentication)
router.delete("/videos/:videoId", auth, deleteVideo);

export default router;
