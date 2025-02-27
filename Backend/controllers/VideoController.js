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
    const video = await Video.findByIdAndUpdate(
      videoId,
      { $inc: { views: 1 } } // Increment the views by 1
    )
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
      _id: { $ne: videoId }, // Exclude the current video
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

// Toggle like/dislike on a video
export const toggleLikeDislikeVideo = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }
  // console.log(req.user);

  const { videoId } = req.params;
  const userId = req.user._id;
  const { action } = req.body; // 'like' or 'dislike'

  if (action !== "like" && action !== "dislike") {
    return res.status(400).json({ message: "Invalid action" });
  }

  try {
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Check if the user has already liked or disliked the video
    const isLiked = video.likedBy.includes(userId);
    const isDisliked = video.dislikedBy.includes(userId);

    if (action === "like") {
      if (isLiked) {
        // If the user has already liked, unlike the video
        video.likedBy = video.likedBy.filter(
          (id) => id.toString() !== userId.toString()
        );
        video.likes -= 1;
      } else {
        // If the user has disliked, remove the dislike and add the like
        if (isDisliked) {
          video.dislikedBy = video.dislikedBy.filter(
            (id) => id.toString() !== userId.toString()
          );
          video.dislikes -= 1;
        }
        video.likedBy.push(userId);
        video.likes += 1;
      }
    } else if (action === "dislike") {
      if (isDisliked) {
        // If the user has already disliked, remove the dislike
        video.dislikedBy = video.dislikedBy.filter(
          (id) => id.toString() !== userId.toString()
        );
        video.dislikes -= 1;
      } else {
        // If the user has liked, remove the like and add the dislike
        if (isLiked) {
          video.likedBy = video.likedBy.filter(
            (id) => id.toString() !== userId.toString()
          );
          video.likes -= 1;
        }
        video.dislikedBy.push(userId);
        video.dislikes += 1;
      }
    }

    // Save the updated video
    await video.save();

    // Return the updated video data with likes and dislikes
    res.json({
      message: `Video ${action}d successfully`,
      likes: video.likes,
      dislikes: video.dislikes,
      isLiked: video.likedBy.includes(userId),
      isDisliked: video.dislikedBy.includes(userId),
    });
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
