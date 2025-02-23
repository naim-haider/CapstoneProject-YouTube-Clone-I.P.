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
    logoutUser: (state) => {
      state.YTuserInfo = null;
      state.YTtoken = null;
      localStorage.removeItem("userToken");
      localStorage.removeItem("YTuserToken");
      localStorage.removeItem("channels");
    },
  },
});

export const { loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
