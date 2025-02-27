import { createSlice } from "@reduxjs/toolkit";
import { logoutUser } from "./userSlice";

// Initial state from localStorage or default to an empty array if not available
const initialState = {
  channels: JSON.parse(localStorage.getItem("channels")) || [],
};

const channelSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    setChannels: (state, action) => {
      state.channels = action.payload;
      localStorage.setItem("channels", JSON.stringify(action.payload)); // Persist in localStorage
    },

    // Add a new channel
    addChannel: (state, action) => {
      if (state.channels.length > 0) {
        console.log("A user can only create one channel.");
        return;
      }

      // If no channel exists, push the new one
      state.channels.push(action.payload);
      localStorage.setItem("channels", JSON.stringify(state.channels));
    },
  },

  extraReducers: (builder) => {
    builder.addCase(logoutUser, (state) => {
      state.channels = [];
      localStorage.removeItem("channels");
    });
  },
});

export const { setChannels, addChannel } = channelSlice.actions;
export default channelSlice.reducer;
