import Comment from "../models/CommentModel.js";
import Video from "../models/VideoModel.js";

// Add a comment
export const addComment = async (req, res) => {
  const { videoId, text } = req.body;
  const userId = req.user._id;

  try {
    // Check if the video exists
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Create a new comment
    const comment = new Comment({
      userId,
      videoId,
      text,
    });

    // Save the comment
    await comment.save();

    // Add comment to the video's comments array
    video.comments.push(comment._id);
    await video.save();

    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get comments for a specific video
export const getComments = async (req, res) => {
  const { videoId } = req.params;

  try {
    const video = await Video.findById(videoId);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const comments = await Comment.find({ videoId })
      .populate("userId", "username")
      .sort({ timestamp: -1 });

    res.json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Edit a comment
export const editComment = async (req, res) => {
  const { commentId } = req.params;
  const { text } = req.body;
  const userId = req.user._id;
  // console.log(userId.toString());

  try {
    // Find the comment by ID
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    // console.log(comment.userId.toString());

    // Check if the user is the owner of the comment
    if (comment.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to edit this comment" });
    }

    // Update the comment text
    comment.text = text;
    await comment.save();

    res.json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Delete a comment
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Remove the comment from the associated video's comments array
    const video = await Video.findById(comment.videoId);
    video.comments = video.comments.filter((id) => id.toString() !== commentId);
    await video.save();

    res.json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
