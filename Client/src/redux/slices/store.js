import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import videoReducer from "./slices/videoSlice";
import channelReducer from "./slices/channelSlice";
import commentReducer from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    videos: videoReducer,
    channels: channelReducer,
    comments: commentReducer,
  },
});
