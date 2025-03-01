import express from "express";
import {
  createChannel,
  getChannel,
  getChannelById,
  toggleSubscription,
} from "../controllers/ChannelController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/channels/", auth, createChannel);
router.get("/channels/:channelId", auth, getChannel);
router.get("/channels/channelById/:channelId", getChannelById);
router.post("/channels/:channelId/subscribe", auth, toggleSubscription);

export default router;
