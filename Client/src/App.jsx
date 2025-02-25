import "./App.css";
import React, { Suspense, lazy, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import SignupPage from "./Pages/SignupPage";
import LoginPage from "./Pages/LoginPage";
import { getVideos } from "./api/videoApi";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import CreateChannelPage from "./Pages/CreateChannelPage";
import ChannelPage from "./Pages/ChannelPage";

function App() {
  const { videos, error } = getVideos();
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Toggle function to open/close the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle the search logic when user clicks search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setFilteredVideos(videos); // Reset to show all videos
    } else {
      const results = videos.filter((video) =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVideos(results); // Update search results with filtered videos
    }
  };
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Header
          onToggleSidebar={toggleSidebar}
          isOpen={isSidebarOpen}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
        />
        <Sidebar isOpen={isSidebarOpen} onToggleSidebar={toggleSidebar} />
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                isOpen={isSidebarOpen}
                onToggleSidebar={toggleSidebar}
                filteredVideos={filteredVideos}
                setFilteredVideos={setFilteredVideos}
              />
            }
          />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-channel" element={<CreateChannelPage />} />
          <Route path="/channel" element={<ChannelPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
