import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  YTuserInfo: JSON.parse(localStorage.getItem("YTuserInfo")) || null,
  YTtoken: localStorage.getItem("YTuserToken") || null,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.YTuserInfo = action.payload.YTuserInfo;
      state.YTtoken = action.payload.YTtoken;
      localStorage.setItem(
        "YTuserInfo",
        JSON.stringify(action.payload.YTuserInfo)
      );
      localStorage.setItem("YTuserToken", action.payload.YTtoken);
    },
    // Add channel to user's list of channels
    addChannelToUser: (state, action) => {
      if (state.YTuserInfo) {
        state.YTuserInfo.channels.push(action.payload); // Add the new channel ID to the user's channels array
        localStorage.setItem("YTuserInfo", JSON.stringify(state.YTuserInfo)); // Persist updated user to localStorage
      }
    },
    logoutUser: (state) => {
      state.YTuserInfo = null;
      state.YTtoken = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("YTuserToken");
      localStorage.removeItem("channels");
    },
  },
});

export const { loginUser, logoutUser, addChannelToUser } = userSlice.actions;
export default userSlice.reducer;
