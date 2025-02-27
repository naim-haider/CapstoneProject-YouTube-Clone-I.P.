import React, { useEffect, useState } from "react";
import VideoPlayer from "../Components/VideoPlayer";
import { useParams } from "react-router-dom";
import { getVideoById } from "../api/videoApi";

const VideoPage = () => {
  const { videoId } = useParams();
  const [singleVideo, setSingleVideo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch video data when videoId changes
    const fetchVideoData = async () => {
      try {
        const videoData = await getVideoById(videoId);
        setSingleVideo(videoData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, [videoId]);
  // console.log(singleVideo);
  // const channelId = singleVideo?.channelId?._id;
  // console.log(channelId);

  if (loading) {
    return (
      <div className="text-center text-3xl font-medium mt-[20%]">
        Loading...
      </div>
    );
  }
  if (error) return <div className="mt-20 ml-12">Error: {error}</div>;

  return (
    <div>
      <VideoPlayer video={singleVideo} />
    </div>
  );
};

export default VideoPage;
