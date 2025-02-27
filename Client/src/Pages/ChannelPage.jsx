import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChannels } from "../redux/slices/channelSlice";
import axios from "axios";
import { getVideos } from "../api/videoApi";
import { Link } from "react-router-dom";
import { getTimeDuration } from "../utils/uploadTime";

const ChannelPage = () => {
  const { videos } = getVideos();
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(null);
  const channels = useSelector((state) => state.channels.channels);
  const userInfo = useSelector((state) => state.user.YTuserInfo);
  const channelId = userInfo?.channels[0];
  // const channelId = channels._id;
  // console.log(userInfo);
  // console.log(channelId);
  // console.log(channels);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios.get(
        `http://localhost:5002/api/channels/${channelId}`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
          },
        }
      ); // Get channels from the backend
      dispatch(setChannels(response.data)); // Store channels in Redux state and localStorage
      // console.log(response.data);
    };

    fetchChannels();
  }, [dispatch]);

  const videosId = channels?.channel?.videos?.map((video) => video._id);
  // console.log(videosId);

  console.log(channels);
  const userVideos = videos?.filter((video) => videosId?.includes(video._id));
  // console.log(userVideos);

  // Function to toggle modal visibility
  const toggleModal = (videoId) => {
    setIsOpen(isOpen === videoId ? null : videoId);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      // Delete the video from the backend
      const response = await axios.delete(
        `http://localhost:5002/api/videos/${videoId}`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      console.log("Video deleted successfully!", response);

      const updatedChannels = {
        ...channels, // Copy the current channels object
        channel: {
          ...channels.channel, // Copy the current channel data
          videos: channels.channel.videos.filter(
            (video) => video._id !== videoId
          ), // Filter out the deleted video
        },
      };

      // Dispatch the updated channels to Redux
      dispatch(setChannels(updatedChannels));
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
  return (
    <>
      <div className="absolute top-20 md:left-10 lg:left-30 xl:left-56 md:top-40 lg:top-28 w-screen  md:w-[90%] lg:w-[85%] md:h-[20%] xl:h-[30%] h-[12%] ">
        <img
          src={channels?.channel?.channelBanner}
          alt="channelBanner"
          className="h-full w-full md:rounded-3xl"
        />
        <div className="flex flex-wrap  ml-16 md:ml-0 gap-8 my-3">
          <img
            src={userInfo?.avatar}
            alt="userAvatar"
            className="h-64 w-64 mt-2 rounded-full"
          />
          <div className="md:mt-8 flex flex-col gap-4">
            <p className="font-bold text-3xl md:text-5xl">
              {userInfo?.userName}
            </p>
            <p className="font-semibold text-xl">{userInfo?.email}</p>
            <p className="text-xl text-gray-600">
              More about this channel{" "}
              <span className="text-black font-semibold cursor-pointer">
                ...more
              </span>
            </p>
            <div className="flex flex-wrap gap-5">
              <p className="bg-gray-100 font-semibold md:text-[18px] py-3 px-6 rounded-full cursor-pointer hover:bg-gray-200">
                Customize channel
              </p>
              <p className="bg-gray-100 font-semibold md:text-[18px] py-3 px-6 rounded-full cursor-pointer hover:bg-gray-200">
                Manage videos
              </p>
            </div>
          </div>
        </div>
        <hr className="my-3 border-gray-400" />
        <div className="my-6 text-center text-2xl font-bold">All videos</div>
        <div className="flex flex-wrap pb-20 gap-5 my-5">
          {userVideos.map((video) => {
            const uploadTime = getTimeDuration(video?.uploadDate);
            return (
              <div
                key={video._id}
                className="h-[80%] w-[94%] md:w-[32%] ml-3 md:ml-0"
              >
                <div className="w-full">
                  <iframe
                    height={200}
                    className="w-full hidden"
                    id="video"
                    src={video?.videoUrl}
                    title={video?.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen=""
                  />
                </div>
                <Link to={`/video/${video?._id}`}>
                  <div className="w-full" id="image">
                    <img
                      src={video?.thumbnailUrl}
                      alt="thumbnail"
                      className="w-full rounded-2xl cursor-pointer"
                    />
                  </div>
                </Link>
                <div className="w-full flex px-2 ">
                  <div className="h-16 w-10 mt-3">
                    <img
                      src={userInfo?.avatar}
                      alt="avatar image"
                      className="h-8 w-8 mr-20 mt-2 rounded-full"
                    />
                  </div>
                  <div className="h-16 mt-2 w-screen font-semibold text-md flex flex-col">
                    <div className="flex items-center justify-between mt-2 relative">
                      <p>{video?.title}</p>
                      <div className="relative">
                        <i
                          className="fa-solid fa-ellipsis-vertical cursor-pointer"
                          onClick={() => toggleModal(video?._id)}
                        ></i>

                        {isOpen === video?._id && (
                          <div className="absolute top-0 right-0 mt- -mr-4 bg-gray-100 rounded-md shadow-lg w-auto z-50">
                            <div className="p- max-w-xs">
                              <div className="flex justify-center items-center px-3 py-2 gap-3">
                                <div className="flex items-center gap-3">
                                  <Link to={`/update-video/${video._id}`}>
                                    <button className="font-medium text-sm cursor-pointer">
                                      Edit
                                    </button>
                                  </Link>
                                  <button
                                    onClick={() =>
                                      handleDeleteVideo(video?._id)
                                    }
                                    className="text-sm font-medium cursor-pointer"
                                  >
                                    Delete
                                  </button>
                                </div>
                                <div className="flex justify-end">
                                  <svg
                                    onClick={toggleModal}
                                    className="w-3 h-3 cursor-pointer"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 14 14"
                                  >
                                    <path
                                      stroke="currentColor"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center mt-1">
                      <p className="text-sm text-gray-600">
                        {video?.channelId?.channelName}
                      </p>
                      <div className="text-gray-600 ml-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                          />
                        </svg>
                      </div>
                    </div>
                    <div className="text-gray-600 -mt-2 ">
                      <span>{video?.views} views</span>
                      <span className="relative bottom-1 text-3xl"> . </span>
                      <span>{uploadTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ChannelPage;
