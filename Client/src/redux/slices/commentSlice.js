import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const { VITE_API_ENDPOINT } = import.meta.env;

// Add Comment
export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ videoId, text }, { rejectWithValue }) => {
    const userToken = localStorage.getItem("YTuserToken");

    if (!userToken) {
      alert("You must be logged in to post comments!");
      return rejectWithValue({ message: "User not logged in" });
    }
    try {
      const response = await axios.post(
        `${VITE_API_ENDPOINT}/comments`,
        {
          videoId,
          text,
        },
        {
          headers: {
            Authorization: `JWT ${userToken}`,
          },
        }
      );
      // Save the comment to localStorage for the specific video
      const currentComments = JSON.parse(localStorage.getItem(videoId)) || [];
      localStorage.setItem(
        videoId,
        JSON.stringify([...currentComments, response.data])
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Get Comments for a Video
export const getComments = createAsyncThunk(
  "comments/getComments",
  async (videoId, { rejectWithValue }) => {
    try {
      // Try fetching from localStorage first
      const storedComments = JSON.parse(localStorage.getItem(videoId));
      if (storedComments) {
        return storedComments;
      }

      // If not in localStorage, fetch from the API
      const response = await axios.get(
        `${VITE_API_ENDPOINT}/comments/${videoId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Edit Comment
export const editComment = createAsyncThunk(
  "comments/editComment",
  async ({ videoId, commentId, text }, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${VITE_API_ENDPOINT}/comments/${commentId}`,
        { text },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );

      // Update the localStorage for the specific video
      const currentComments = JSON.parse(localStorage.getItem(videoId)) || [];
      const updatedComments = currentComments.map((comment) =>
        comment._id === commentId
          ? { ...comment, text: response.data.text }
          : comment
      );
      localStorage.setItem(videoId, JSON.stringify(updatedComments));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Delete Comment
export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async ({ videoId, commentId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${VITE_API_ENDPOINT}/comments/${commentId}`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
        },
      });

      // Remove the deleted comment from localStorage
      const currentComments = JSON.parse(localStorage.getItem(videoId)) || [];
      const updatedComments = currentComments.filter(
        (comment) => comment._id !== commentId
      );
      localStorage.setItem(videoId, JSON.stringify(updatedComments));

      return commentId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Comments Slice
const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(editComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(editComment.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.comments.findIndex(
          (comment) => comment._id === action.payload._id
        );
        if (index >= 0) {
          state.comments[index] = action.payload;
        }
      })
      .addCase(editComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = state.comments.filter(
          (comment) => comment._id !== action.payload
        );
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
