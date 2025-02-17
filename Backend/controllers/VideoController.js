import Video from "../models/VideoModel.js";
import Channel from "../models/ChannelModel.js";

// Create a new video
export const createVideo = async (req, res) => {
  const { title, description, thumbnailUrl, videoUrl, channelId, category } =
    req.body;
  const userId = req.user._id; // Assuming user is authenticated and userId is available from auth middleware

  try {
    // Check if channel exists
    const channel = await Channel.findById(channelId);
    if (!channel) {
      return res.status(400).json({ message: "Channel not found" });
    }

    // Create the new video
    const video = new Video({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channelId,
      uploader: userId,
    });

    // Save the video
    await video.save();

    // Add video to the channel's videos array
    channel.videos.push(video._id);
    await channel.save();

    res.status(201).json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Fetch all videos
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channelId", "channelName") // Populate the channel name
      .populate("uploader", "username") // Populate the uploader's username
      .sort({ uploadDate: -1 }); // Sort by most recent

    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get a specific video
export const getVideo = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findById(videoId)
      .populate("channelId", "channelName")
      .populate("uploader", "username");

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    res.json(video);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Edit the video
export const editVideo = async (req, res) => {
  const { videoId } = req.params;
  const { title, description, thumbnailUrl, videoUrl, category } = req.body;

  try {
    // Find the video by ID
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Update video details
    if (title) video.title = title;
    if (description) video.description = description;
    if (thumbnailUrl) video.thumbnailUrl = thumbnailUrl;
    if (videoUrl) video.videoUrl = videoUrl;
    if (category) video.category = category;

    // Save the updated video
    await video.save();

    res.json({ message: "Video updated successfully", video });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get related videos based on category
export const getRelatedVideos = async (req, res) => {
  const { videoId } = req.params;

  try {
    // Find the video by ID
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find videos in the same category, excluding the current video
    const relatedVideos = await Video.find({
      category: video.category,
      _id: { $ne: videoId },
    });
    res.json(relatedVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get videos that do not match the category of a given video
export const getNonRelatedVideos = async (req, res) => {
  const { videoId } = req.params;

  try {
    // Find the video by ID
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Find videos with a different category, excluding the current video
    const nonMatchingCategoryVideos = await Video.find({
      category: { $ne: video.category }, // Exclude videos with the same category
      _id: { $ne: videoId }, // Exclude the current video
    });

    res.json(nonMatchingCategoryVideos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Delete a video
export const deleteVideo = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findByIdAndDelete(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Remove video from channel's videos array
    const channel = await Channel.findById(video.channelId);
    channel.videos = channel.videos.filter((id) => id.toString() !== videoId);
    await channel.save();

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
