import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";
import ReactPlayer from "react-player";
import SuggestedVideo from "./SuggestedVideo";
import axios from "axios";
import Comments from "./Comments";
import { setChannels } from "../redux/slices/channelSlice";

const VideoPlayer = ({ video }) => {
  const { channels } = useSelector((state) => state.channels);
  const [user, setUser] = useState();
  const [relatedVideo, setRelatedVideo] = useState();
  const [nonRelatedVideo, setNonRelatedVideo] = useState();
  const [channel, setChannel] = useState();
  const [likes, setLikes] = useState(video?.likes || 0);
  const [dislikes, setDislikes] = useState(video?.dislikes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const dispatch = useDispatch();
  const subscriberCount = channels.subscribers;
  const isSubscribed = channels.isSubscribed;
  // console.log(userInfo);
  // console.log(channel);
  // console.log(video);
  // console.log(videoId);
  // console.log(channelId);

  // to get userinfo
  useEffect(() => {
    const fetchUserById = async () => {
      const response = await axios.get(
        `http://localhost:5005/api/users/user/${video?.uploader?._id}`
      );
      setUser(response.data);
      // console.log(response.data);
    };

    fetchUserById();
  }, [video._id]);

  // to get Channel
  useEffect(() => {
    const fetchChannel = async () => {
      const response = await axios.get(
        `http://localhost:5005/api/channels/${video?.channelId?._id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      dispatch(setChannels(response.data));
      setChannel(response.data);
      // console.log(response.data);
    };

    fetchChannel();
  }, [video.channelId._id]);

  // subscribe the channel
  const handleSubscribe = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5005/api/channels/${channel.channel._id}/subscribe`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      dispatch(setChannels(response.data));
      // console.log(response.data);
    } catch (error) {
      console.error("Error while subscribing/unsubscribing", error);
    }
  };
  // console.log(isSubscribed);

  // to get related videos
  useEffect(() => {
    const fetchRelatedVideos = async () => {
      // console.log("id", video);

      const response = await axios.get(
        `http://localhost:5005/api/videos/${video?._id}/related`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      setRelatedVideo(response.data);
      // console.log(response.data);
    };

    fetchRelatedVideos();
  }, [video._id]);
  // console.log(relatedVideo);

  // to get non-related videos
  useEffect(() => {
    const fetchNonRelatedVideos = async () => {
      // console.log("id", video);

      const response = await axios.get(
        `http://localhost:5005/api/videos/${video?._id}/non-reated-video`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      setNonRelatedVideo(response.data);
      // console.log(response.data);
    };

    fetchNonRelatedVideos();
  }, [video._id]);
  // console.log(nonRelatedVideo);

  // Handle like and dislike actions
  const handleLike = async () => {
    console.log(localStorage.getItem("YTuserToken"));

    try {
      const response = await axios.post(
        `http://localhost:5005/api/videos/${video._id}/like-dislike`,
        { action: "like" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );

      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setIsLiked(response.data.isLiked);
      setIsDisliked(response.data.isDisliked);
    } catch (error) {
      console.error("Error while liking the video", error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5005/api/videos/${video._id}/like-dislike`,
        { action: "dislike" },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );

      setLikes(response.data.likes);
      setDislikes(response.data.dislikes);
      setIsLiked(response.data.isLiked);
      setIsDisliked(response.data.isDisliked);
    } catch (error) {
      console.error("Error while disliking the video", error);
    }
  };

  return (
    <div className="px-5 justify-center 2xl:px-4 lg:flex mt-10">
      <div className=" flex justify-center flex-row h-[calc(100%-56px)] mt-16">
        <div className="w-full max-w-[1580px] flex flex-col lg:flex-row">
          <div className="flex flex-col px-4 py-3 lg:py-6">
            <div className="h-[200px] md:h-[700px] ml-[-16px] mr-[-16px] lg:ml-0 lg:mr-0 rounded-4xl">
              <ReactPlayer
                url={video?.videoUrl}
                height="100%"
                width="100%"
                controls
                style={{ backgroundColor: "#000000" }}
                playing={true}
              />
            </div>
            <div className="font-bold text-sm md:text-xl mt-4 line-clamp-2">
              {video?.title}
            </div>
            <div className="flex justify-between flex-col md:flex-row mt-4">
              <div className="flex ">
                <div className="flex items-start">
                  <div className="flex h-11 w-11 rounded-full overflow-hidden">
                    <img
                      className="h-full w-full object-cover"
                      src={user?.avatar}
                    />
                  </div>
                </div>
                <div className="flex space-x-5">
                  <div className="flex flex-col ml-3">
                    <div className="text-md font-semibold flex items-center">
                      {channel?.channelName}
                    </div>
                    <div className=" text-sm">
                      {subscriberCount} subscribers
                    </div>
                  </div>
                  <span
                    onClick={handleSubscribe}
                    className="mt-1 text-center bg-red-500 px-3 pt-2 rounded-full text-white cursor-pointer hover:bg-red-700 duration-200 "
                  >
                    {isSubscribed ? "Unsubscribe" : "Subscribe"}
                  </span>
                </div>
              </div>
              <div className="flex mt-4 md:mt-0">
                <div
                  onClick={handleLike}
                  className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] cursor-pointer"
                >
                  {isLiked ? (
                    <AiFillLike className="text-xl mr-2" />
                  ) : (
                    <AiOutlineLike className="text-xl mr-2" />
                  )}
                  {likes}
                </div>
                <div
                  onClick={handleDislike}
                  className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] cursor-pointer ml-4"
                >
                  {isDisliked ? (
                    <AiFillDislike className="text-xl mr-2" />
                  ) : (
                    <AiOutlineDislike className="text-xl mr-2" />
                  )}
                  {dislikes}
                </div>
                <div className="flex items-center justify-center h-11 px-6 rounded-3xl bg-white/[0.15] ml-4">
                  {`${video?.views} Views`}
                </div>
              </div>
            </div>
            <div className="p-4 bg-gray-100 rounded-xl mt-4 text-sm">
              {video?.description}
            </div>
            <div className="flex gap-x-2 font-semibold rounded-xl mt-4 text-xl">
              {video?.comments.length}
              <p>Comments</p>
            </div>
          </div>
          <div className="flex flex-col px-4 py-6 h-full overflow-y-scroll overflow-x-hidden">
            <Comments videoId={video._id} />
          </div>
        </div>
      </div>
      <div className="mt-15">
        <SuggestedVideo
          relatedVideo={relatedVideo}
          nonRelatedVideo={nonRelatedVideo}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
