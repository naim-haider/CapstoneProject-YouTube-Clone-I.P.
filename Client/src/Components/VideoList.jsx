import React from "react";
import VideoCard from "./VideoCard";

const VideoList = ({ videos }) => {
  // console.log(videos);

  return (
    <section
      className="w-[90%] pb-20 md:gap-36 gap-5 -z-30 h-[92%] absolute top-32 md:left-10 lg:left-36 md:top-48 lg:top-45 flex justify-center flex-wrap gap-x-2 overflow-y-auto mt-3"
      id="content-body"
    >
      {videos?.length === 0 ? (
        <>
          <p className="font-bold relative top-[20%]">No videos found</p>
          <i className="fa-regular fa-face-tired relative top-[20.5%]"></i>
        </>
      ) : (
        videos?.map((video) => <VideoCard key={video._id} video={video} />)
      )}
    </section>
  );
};

export default VideoList;
