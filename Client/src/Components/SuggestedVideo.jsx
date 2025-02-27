import React from "react";
import { Link } from "react-router-dom";

function SuggestedVideo({ relatedVideo, nonRelatedVideo }) {
  // console.log(relatedVideo);
  // console.log(nonRelatedVideo);

  return (
    <div className="flex flex-col gap-4 p-4">
      {relatedVideo?.map((video) => {
        //=== setting upload time starts here ===//
        function getTimeDuration(uploadDate) {
          const uploadTime = new Date(uploadDate); // Convert the uploaded time to a Date object
          const currentTime = new Date(); // Get the current date and time
          const durationInMilliseconds = currentTime - uploadTime; // Difference in milliseconds
          const hours = durationInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

          if (hours < 24) {
            // If the duration is less than 24 hours, return in hours
            return `${Math.floor(hours)} hour${
              Math.floor(hours) !== 1 ? "s" : ""
            } ago`;
          } else {
            // If the duration is more than 24 hours, return in days
            const days = Math.floor(hours / 24);
            return `${days} day${days !== 1 ? "s" : ""} ago`;
          }
        }
        // console.log(getTimeDuration(video.uploadDate));
        const uploadTime = getTimeDuration(video?.uploadDate);
        //=== setting upload time ends here ===//
        return (
          <Link key={video._id} to={`/video/${video?._id}`}>
            <div className="flex flex-col gap-3 text-black w-full md:w-80 ">
              <img
                className="rounded-lg"
                alt="thumbnails"
                src={video?.thumbnailUrl}
              />
              <ul className="flex flex-col ">
                <li className="font-semibold pt-1">{video?.title}</li>
                <li className="font-semibold mb-1">{video?.description} ...</li>
                <li className="text-sm text-slate-400 flex gap-2">
                  kamal channel
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
                  <span className="text-sm">{video?.views} views</span>
                  <span className="relative bottom-1 text-3xl"> . </span>
                  <span className="text-sm">{uploadTime}</span>
                </div>
              </ul>
            </div>
          </Link>
        );
      })}
      {nonRelatedVideo?.map((video) => {
        //=== setting upload time starts here ===//
        function getTimeDuration(uploadDate) {
          const uploadTime = new Date(uploadDate); // Convert the uploaded time to a Date object
          const currentTime = new Date(); // Get the current date and time
          const durationInMilliseconds = currentTime - uploadTime; // Difference in milliseconds
          const hours = durationInMilliseconds / (1000 * 60 * 60); // Convert milliseconds to hours

          if (hours < 24) {
            // If the duration is less than 24 hours, return in hours
            return `${Math.floor(hours)} hour${
              Math.floor(hours) !== 1 ? "s" : ""
            } ago`;
          } else {
            // If the duration is more than 24 hours, return in days
            const days = Math.floor(hours / 24);
            return `${days} day${days !== 1 ? "s" : ""} ago`;
          }
        }
        // console.log(getTimeDuration(video.uploadDate));
        const uploadTime = getTimeDuration(video?.uploadDate);
        //=== setting upload time ends here ===//
        return (
          <Link key={video._id} to={`/video/${video?._id}`}>
            <div className="flex flex-col gap-3 text-black w-80">
              <img
                className="rounded-lg"
                alt="thumbnails"
                src={video?.thumbnailUrl}
              />
              <ul className="flex flex-col ">
                <li className="font-semibold pt-1">{video?.title}</li>
                <li className="font-semibold mb-1">{video?.description} ...</li>
                <li className="text-sm text-slate-400 flex gap-2">
                  {/* {video?.snippet?.channelTitle} */}
                  kamal channel
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
                  <span className="text-sm">{video?.views} views</span>
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
