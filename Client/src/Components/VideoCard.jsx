import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTimeDuration } from "../utils/uploadTime";
import axios from "axios";

const VideoCard = ({ video }) => {
  const [user, setUser] = useState();

  //===upload time===//
  const uploadTime = getTimeDuration(video?.uploadDate);

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
  // console.log(user);

  return (
    <>
      <div className="h-80 w-[94%] md:w-[32%] ml-7 md:ml-0">
        <Link to={`/video/${video?._id}`}>
          <div className="w-full" id="image">
            <img
              src={video?.thumbnailUrl}
              alt="thumbnail"
              className="w-full xl:h-75 md:h-34 lg:h-44 rounded-2xl cursor-pointer"
            />
          </div>
        </Link>
        <div className="w-full flex px-2 ">
          <div className="h-16 w-10 mt-3">
            <img
              src={user?.avatar}
              alt=""
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
    </>
  );
};

export default VideoCard;
