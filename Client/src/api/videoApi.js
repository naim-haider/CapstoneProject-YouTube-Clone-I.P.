import axios from "axios";
import { useState, useEffect } from "react";

const API_URL = "http://localhost:5005/api";

export const getVideos = () => {
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/videos`)
      .then((response) => setVideos(response.data))
      .catch((err) => setError(err.message));
  }, []);
  // console.log(videos);
  return { videos, error };
};

export const getVideoById = async (videoId) => {
  try {
    const response = await axios.get(`${API_URL}/videos/${videoId}`);
    return response.data; // Return video data
  } catch (err) {
    throw new Error(err.message); // Throw error in case of failure
  }
};
