import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videos }) => {
  // console.log(videos);

  return (
    <section
      className="w-[90%] pb-16 py-4  md:py-0 -z-30 absolute top-32 md:left-10 lg:left-28 md:top-55 lg:top-60 xl:top-50 flex justify-center overflow-y-visible gap-y-2 flex-wrap md:gap-x-3 lg:gap-x-1 xl:gap-x-3 xl:gap-y-36 mt-3"
      id="content-body"
    >
      {videos.length === 0 ? (
        <>
          <p className="font-bold relative top-[20%]">No videos found</p>
          <i className="fa-regular fa-face-tired relative top-[20.5%]"></i>
        </>
      ) : (
        videos.map((video) => <VideoCard key={video._id} video={video} />)
      )}
    </section>
  );
};

export default VideoList;
