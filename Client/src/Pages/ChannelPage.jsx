import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChannels } from "../redux/slices/channelSlice";
import axios from "axios";
import { getVideos } from "../api/videoApi";
import { Link } from "react-router-dom";
import { getTimeDuration } from "../utils/uploadTime";

const ChannelPage = () => {
  const { videos } = getVideos();
  const dispatch = useDispatch();
  const channels = useSelector((state) => state.channels.channels);
  // const channelId = channels._id;
  const userInfo = useSelector((state) => state.user.YTuserInfo);
  // console.log(userInfo);
  const channelId = userInfo?.channels[0];
  // console.log(channelId);
  // console.log(channels);

  useEffect(() => {
    const fetchChannels = async () => {
      const response = await axios.get(
        `http://localhost:5005/api/channels/${channelId}`,
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
                    <div className="flex items-center justify-between mt-2">
                      <p>{video?.title}</p>
                      <i className="fa-solid fa-ellipsis-vertical cursor-pointer"></i>
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
