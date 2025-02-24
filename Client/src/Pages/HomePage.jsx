import React, { useState, useEffect } from "react";
import FilterButtons from "../Components/FilterButtons";
import { getVideos } from "../api/videoApi";
import VideoList from "../Components/VideoList";

const HomePage = ({ filteredVideos, setFilteredVideos, searchQuery }) => {
  const { videos, error } = getVideos();
  const [activeCategory, setActiveCategory] = useState("All");

  // Handle the category filter
  const handleFilter = (category) => {
    setActiveCategory(category); // Set the active category for filter
  };

  // Effect for applying search and filter
  useEffect(() => {
    if (!videos || videos.length === 0) {
      return;
    }

    if (activeCategory === "All") {
      setFilteredVideos(videos); // Show all videos
    } else {
      // Apply both search and category filter
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
  }, [videos]); // Run this effect when videos are loaded
  return (
    <div>
      <FilterButtons onFilter={handleFilter} />
      <VideoList videos={filteredVideos} />
    </div>
  );
};

export default HomePage;
