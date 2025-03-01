import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AiOutlineDislike,
  AiOutlineLike,
  AiFillDislike,
  AiFillLike,
} from "react-icons/ai";
import ReactPlayer from "react-player";
import { RiShareForwardLine } from "react-icons/ri";
import { BsThreeDots } from "react-icons/bs";
import SuggestedVideo from "./SuggestedVideo";
import axios from "axios";
import Comments from "./Comments";
import { setChannels } from "../redux/slices/channelSlice";
import { Link } from "react-router-dom";

const VideoPlayer = ({ video }) => {
  const { VITE_API_ENDPOINT } = import.meta.env;
  const { channels } = useSelector((state) => state.channels);
  const [user, setUser] = useState();
  const [relatedVideo, setRelatedVideo] = useState([]);
  const [nonRelatedVideo, setNonRelatedVideo] = useState([]);
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
  // console.log("rel", relatedVideo);
  // console.log("non", nonRelatedVideo);

  // to get userinfo
  useEffect(() => {
    const fetchUserById = async () => {
      const response = await axios.get(
        `${VITE_API_ENDPOINT}/users/user/${video?.uploader?._id}`
      );
      setUser(response.data);
      // console.log(response.data);
    };

    fetchUserById();
  }, [video._id]);

  // to get Channel
  useEffect(() => {
    const fetchChannel = async () => {
      try {
        const response = await axios.get(
          `${VITE_API_ENDPOINT}/channels/channelById/${video?.channelId?._id}`
        );
        dispatch(setChannels(response.data));
        setChannel(response.data);
      } catch (error) {
        console.error("Error fetching channel data:", error);
      }
    };

    if (video?.channelId?._id) {
      fetchChannel();
    }
  }, [video?.channelId?._id]);

  // subscribe the channel
  const handleSubscribe = async () => {
    const userToken = localStorage.getItem("YTuserToken");

    if (!userToken) {
      alert("You must be logged in to subscribe to a channel!");
      return;
    }
    try {
      const response = await axios.post(
        `${VITE_API_ENDPOINT}/channels/${channel.channel._id}/subscribe`,
        {},
        {
          headers: {
            Authorization: `JWT ${userToken}`,
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
        `${VITE_API_ENDPOINT}/videos/${video?._id}/related`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      setRelatedVideo(response.data.relatedVideos);
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
        `${VITE_API_ENDPOINT}/videos/${video?._id}/non-reated-video`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      setNonRelatedVideo(response.data.nonRelatedVideos);
      // console.log(response.data);
    };

    fetchNonRelatedVideos();
  }, [video._id]);
  // console.log(nonRelatedVideo);

  // Handle like and dislike actions
  const handleLike = async () => {
    const userToken = localStorage.getItem("YTuserToken");

    if (!userToken) {
      alert("You must be logged in to like the video!");
      return;
    }

    try {
      const response = await axios.post(
        `${VITE_API_ENDPOINT}/videos/${video._id}/like-dislike`,
        { action: "like" },
        {
          headers: {
            Authorization: `JWT ${userToken}`,
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
    const userToken = localStorage.getItem("YTuserToken");

    if (!userToken) {
      alert("You must be logged in to dislike the video!");
      return;
    }
    try {
      const response = await axios.post(
        `${VITE_API_ENDPOINT}/videos/${video._id}/like-dislike`,
        { action: "dislike" },
        {
          headers: {
            Authorization: `JWT ${userToken}`,
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
  // console.log(video);
  console.log(channel);

  return (
    <div className="px-5 justify-center 2xl:px-4 xl:flex mt-10 lg:w-[90%] xl:w-[90%] relative lg:left-24 xl:left-28">
      <div className="  h-[calc(100%-56px)] mt-16 md:mt-28">
        <div className="w-full max-w-[1580px] flex flex-col ">
          <div className="flex flex-col px-4 py-3">
            <div className="h-[200px] xl:h-[700px] md:h-100 ml-[-16px] mr-[-16px] lg:ml-0 lg:mr-0">
              <ReactPlayer
                url={video?.videoUrl}
                height="100%"
                width="100%"
                controls
                playing={true}
              />
            </div>
            <div className="font-bold text-sm md:text-xl mt-4 line-clamp-2">
              {video?.title}
            </div>
            <div className="flex justify-between flex-col md:flex-row mt-4">
              <div className="flex">
                <div className="flex items-start">
                  <Link to={`/channel/${video?.channelId?._id}`}>
                    <div className="flex h-11 w-11 rounded-full overflow-hidden">
                      <img
                        className="h-full w-full object-cover"
                        src={user?.avatar}
                      />
                    </div>
                  </Link>
                </div>
                <div className="flex items-center space-x-5">
                  <div className="flex flex-col ml-3">
                    <Link to={`/channel/${video?.channelId?._id}`}>
                      <div className="text-md font-semibold flex items-center">
                        {channel?.channel?.channelName}
                      </div>
                    </Link>
                    <div className=" text-sm">
                      {subscriberCount} subscribers
                    </div>
                  </div>
                  <span
                    onClick={handleSubscribe}
                    className="text-center bg-red-500 px-4 py-2 rounded-full text-white cursor-pointer hover:bg-red-700 duration-200 "
                  >
                    {isSubscribed ? "Unsubscribe" : "Subscribe"}
                  </span>
                </div>
              </div>
              <div className="flex mt-4 md:mt-0 ">
                <div className="flex bg-gray-100 rounded-full">
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
                  <hr className="border-gray-300 border-1 h-[80%] mt-1" />
                  <div
                    onClick={handleDislike}
                    className="flex items-center justify-center h-11 px-4 rounded-3xl bg-white/[0.15] cursor-pointer"
                  >
                    {isDisliked ? (
                      <AiFillDislike className="text-xl" />
                    ) : (
                      <AiOutlineDislike className="text-xl" />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 cursor-pointer md:ml-8 ml-3 bg-gray-100 px-6 rounded-full">
                  <RiShareForwardLine className="text-2xl" />
                  <span>Share</span>
                </div>
                <div className="flex items-center cursor-pointer bg-gray-100 gap-1 justify-center h-12 px-4 rounded-3xl ml-3">
                  <BsThreeDots />
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
          <div className="flex flex-col px-4 max-h-screen overflow-y-scroll overflow-x-hidden xl:mb-20">
            <Comments videoId={video._id} />
          </div>
        </div>
      </div>
      <hr className="border-gray-400 xl:border-0" />
      <div className="h-screen  xl:overflow-y-auto scrollbar-hidden">
        <SuggestedVideo
          relatedVideo={relatedVideo}
          nonRelatedVideo={nonRelatedVideo}
        />
      </div>
    </div>
  );
};

export default VideoPlayer;
