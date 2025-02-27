import React, { useState, useEffect } from "react";
import FilterButtons from "../Components/FilterButtons";
import { getVideos } from "../api/videoApi";
import VideoList from "../Components/VideoList";

const HomePage = ({ filteredVideos, setFilteredVideos, searchQuery }) => {
  const { videos } = getVideos();
  const [activeCategory, setActiveCategory] = useState("All");

  // Handle the category filter
  const handleFilter = (category) => {
    setActiveCategory(category);
  };

  useEffect(() => {
    if (!videos || videos.length === 0) {
      return;
    }

    if (activeCategory === "All") {
      setFilteredVideos(videos); // Show all videos
    } else {
      const filteredByCategory = videos.filter(
        (video) => video.category === activeCategory
      );
      setFilteredVideos(filteredByCategory); // Set filtered videos after category filter
    }
  }, [searchQuery, activeCategory, videos]); // Re-run when these values change

  // Initialize filteredVideos with all videos if no search is applied
  useEffect(() => {
    if (videos && videos.length > 0) {
      setFilteredVideos(videos); // Set initial filtered videos to all videos
    }
  }, [videos]);
  return (
    <div>
      <FilterButtons onFilter={handleFilter} />
      <VideoList videos={filteredVideos} />
    </div>
  );
};

export default HomePage;
