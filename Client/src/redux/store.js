import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import channelReducer from "./slices/channelSlice";
import commentReducer from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    channels: channelReducer,
    comments: commentReducer,
  },
});
