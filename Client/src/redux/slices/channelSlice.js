import { createSlice } from "@reduxjs/toolkit";

// Initial state from localStorage or default to an empty array if not available
const initialState = {
  channels: JSON.parse(localStorage.getItem("channels")) || [],
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    // Set channels (e.g., when fetching all channels for the user)
    setChannels: (state, action) => {
      state.channels = action.payload;
      localStorage.setItem("channels", JSON.stringify(action.payload)); // Persist in localStorage
    },

    // Add a new channel (after user creates a channel)
    addChannel: (state, action) => {
      if (state.channels.length > 0) {
        console.log("A user can only create one channel.");
        return; // Early exit - don't proceed to the channel push
      }

      // If no channel exists, push the new one
      state.channels.push(action.payload);
      localStorage.setItem("channels", JSON.stringify(state.channels));
    },

    // Update an existing channel (e.g., when editing channel details)
    updateChannel: (state, action) => {
      const updatedChannel = action.payload;
      const index = state.channels.findIndex(
        (channel) => channel._id === updatedChannel._id
      );
      if (index !== -1) {
        state.channels[index] = updatedChannel;
        localStorage.setItem("channels", JSON.stringify(state.channels)); // Persist in localStorage
      }
    },
  },
});

export const { setChannels, addChannel, updateChannel } = channelSlice.actions;
export default channelSlice.reducer;
