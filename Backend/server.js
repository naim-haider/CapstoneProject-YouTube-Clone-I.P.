import express from "express";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import cors from "cors";
//=== Routes import ===//
import userRoutes from "./routes/UserRoutes.js";
import channelRoutes from "./routes/ChannelRoutes.js";
import videoRoutes from "./routes/VideoRoutes.js";
import commentRoutes from "./routes/CommentRoutes.js";

connectDB();

dotenv.config();

const app = express();

app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // to parse JSON bodies

// ===All Routes=== //
// Use user routes
app.use("/api", userRoutes);
// Use channel routes
app.use("/api", channelRoutes);
// Use video routes
app.use("/api", videoRoutes);
// Use comment routes
app.use("/api", commentRoutes);

const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
