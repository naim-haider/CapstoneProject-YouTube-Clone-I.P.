import express from "express";
import {
  createChannel,
  getChannel,
  toggleSubscription,
} from "../controllers/ChannelController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createChannel);
router.get("/:channelId", auth, getChannel);
// Subscribe/Unsubscribe route
router.post("/:channelId/subscribe", auth, toggleSubscription);

export default router;
