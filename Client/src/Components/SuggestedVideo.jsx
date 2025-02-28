import React from "react";
import { Link } from "react-router-dom";
import { getTimeDuration } from "../utils/uploadTime";

function SuggestedVideo({ relatedVideo, nonRelatedVideo }) {
  // console.log(relatedVideo);
  // console.log(nonRelatedVideo);

  return (
    <div className="flex xl:flex-col flex-wrap justify-center gap-4 p-4 xl:pt-22 mb-18 xl:mb-0">
      {relatedVideo?.map((video) => {
        const uploadTime = getTimeDuration(video?.video?.uploadDate);

        return (
          <Link key={video?.video?._id} to={`/video/${video?.video?._id}`}>
            <div className="flex flex-col gap-3 text-black w-full md:w-80">
              <img
                className="rounded-lg"
                alt="thumbnails"
                src={video?.video?.thumbnailUrl}
              />
              <ul className="flex flex-col ">
                <li className="font-semibold pt-1">{video?.video?.title}</li>
                <li className="text-sm text-slate-400 flex gap-2">
                  {video?.channel?.channelName}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <circle cx="12" cy="12" r="10" fill="gray" />
                    <path
                      d="M9 19.2L4.8 15 6.2 13.6l2.8 3L17.8 7 19.2 8.4z"
                      fill="white"
                    />
                  </svg>
                </li>
                <div className="text-gray-600 -mt-2 ">
                  <span className="text-sm">{video?.video?.views} views</span>
                  <span className="relative bottom-1 text-3xl"> . </span>
                  <span className="text-sm">{uploadTime}</span>
                </div>
              </ul>
            </div>
          </Link>
        );
      })}
      {nonRelatedVideo?.map((video) => {
        const uploadTime = getTimeDuration(video?.video?.uploadDate);
        return (
          <Link key={video?.video?._id} to={`/video/${video?.video?._id}`}>
            <div className="flex flex-col gap-3 text-black w-full md:w-80">
              <img
                className="rounded-lg"
                alt="thumbnails"
                src={video?.video?.thumbnailUrl}
              />
              <ul className="flex flex-col ">
                <li className="font-semibold pt-1">{video?.video?.title}</li>
                <li className="text-sm text-slate-400 flex gap-2">
                  {video?.channel?.channelName}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                  >
                    <circle cx="12" cy="12" r="10" fill="gray" />
                    <path
                      d="M9 19.2L4.8 15 6.2 13.6l2.8 3L17.8 7 19.2 8.4z"
                      fill="white"
                    />
                  </svg>
                </li>
                <div className="text-gray-600 -mt-2 ">
                  <span className="text-sm">{video?.video?.views} views</span>
                  <span className="relative bottom-1 text-3xl"> . </span>
                  <span className="text-sm">{uploadTime}</span>
                </div>
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default SuggestedVideo;
