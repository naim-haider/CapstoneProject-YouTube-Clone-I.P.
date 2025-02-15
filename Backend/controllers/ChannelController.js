import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

// Create a new channel
export const createChannel = async (req, res) => {
  const { channelName, description, channelBanner } = req.body;
  const userId = req.user._id; // Assuming user is authenticated
  const user = await User.findById(userId);
  // console.log(req);
  console.log(user);

  try {
    // If the user already has a channel, do not allow creating another one
    if (user.channels.length > 0) {
      return res
        .status(400)
        .json({ message: "A user can only create one channel." });
    }
    // Check if channel name already exists
    const existingChannel = await Channel.findOne({ channelName });
    if (existingChannel) {
      return res.status(400).json({ message: "Channel name already exists" });
    }
    console.log(user);

    // Create the new channel
    const channel = new Channel({
      channelName: channelName,
      owner: userId,
      description: description,
      channelBanner: channelBanner,
    });

    // Save the channel
    await channel.save();

    // Add channel to the user's list of channels

    user.channels.push(channel._id);
    await user.save();

    res.status(201).json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get channel details
export const getChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    res.json(channel);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
