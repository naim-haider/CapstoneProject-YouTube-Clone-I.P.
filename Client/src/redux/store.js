import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import channelReducer from "./slices/channelSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    channels: channelReducer,
  },
});
