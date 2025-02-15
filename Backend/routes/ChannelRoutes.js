import express from "express";
import { createChannel, getChannel } from "../controllers/ChannelController.js";
import { auth } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", auth, createChannel);
router.get("/:channelId", auth, getChannel);

export default router;
