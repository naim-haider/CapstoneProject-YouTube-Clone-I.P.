import Channel from "../models/ChannelModel.js";
import User from "../models/UserModel.js";

// Create a new channel
export const createChannel = async (req, res) => {
  const { channelName, description, channelBanner } = req.body;
  const userId = req.user._id;
  const user = await User.findById(userId);
  // console.log(req);
  // console.log(user);

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
    // console.log("user", user);

    // Create the new channel
    const channel = new Channel({
      channelName: channelName,
      owner: userId,
      description: description,
      channelBanner: channelBanner,
    });
    // console.log("channel", channel);

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

// Subscribe/Unsubscribe a user to a channel
export const toggleSubscription = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const { channelId } = req.params;
  const userId = req.user._id;

  try {
    const channel = await Channel.findById(channelId);

    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Ensure subscriberList is always an array
    if (!Array.isArray(channel.subscriberList)) {
      channel.subscriberList = [];
    }

    // Check if the user is already subscribed
    const isSubscribed = channel.subscriberList.includes(userId);

    if (isSubscribed) {
      // Unsubscribe logic
      channel.subscriberList = channel.subscriberList.filter(
        (id) => id && id.toString() !== userId.toString() // Add check for valid `id`
      );
      channel.subscribers -= 1;
    } else {
      // Subscribe logic
      channel.subscriberList.push(userId);
      channel.subscribers += 1;
    }

    // Save the updated channel
    await channel.save();

    // Return the updated channel and subscription status
    res.json({
      message: isSubscribed
        ? "Unsubscribed successfully"
        : "Subscribed successfully",
      isSubscribed: !isSubscribed,
      subscribers: channel.subscribers,
      channel: channel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get channel details
export const getChannel = async (req, res) => {
  const { channelId } = req.params;

  try {
    // Find the channel by its ID
    const channel = await Channel.findById(channelId)
      .populate("owner", "username") // Populate the owner field with just the username
      .populate("videos", "title"); // Populate the videos field with titles

    // If the channel is not found, return a 404 error
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }

    // Check if the user is authenticated and subscribed to the channel
    const userId = req.user ? req.user._id : null;
    const isSubscribed = userId && channel.subscriberList.includes(userId);

    // Send the channel data and subscription status to the client
    res.json({
      channel,
      isSubscribed: isSubscribed || false,
      subscribers: channel.subscribers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Get channel details
export const getChannelById = async (req, res) => {
  const { channelId } = req.params;

  try {
    // Find the channel by its ID
    const channel = await Channel.findById(channelId)
      .populate("owner")
      .populate("videos");

    // If the channel is not found, return a 404 error
    if (!channel) {
      return res.status(404).json({ message: "Channel not found" });
    }
    // Send the channel data and subscription status to the client
    res.json({
      channel,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};
