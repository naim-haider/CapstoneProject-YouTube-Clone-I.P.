import React, { Suspense, lazy, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getVideos } from "./api/videoApi";
import Header from "./Components/Header";

// For performance Optimization //
const HomePage = lazy(() => import("./Pages/HomePage"));
const VideoPage = lazy(() => import("./Pages/VideoPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const CreateChannelPage = lazy(() => import("./Pages/CreateChannelPage"));
const ChannelPage = lazy(() => import("./Pages/ChannelPage"));
const OthersChannelPage = lazy(() => import("./Pages/OthersChannelPage"));
const CreateVideoPage = lazy(() => import("./Pages/CreateVideoPage"));
const UpdateVideoPage = lazy(() => import("./Pages/UpdateVideoPage"));
const Sidebar = lazy(() => import("./Components/Sidebar"));

function App() {
  const { videos } = getVideos();
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false); //for mobile search

  // Toggle function to open/close the sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Handle the search logic when user clicks search
  const handleSearch = () => {
    setIsInputVisible(!isInputVisible);
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
          isInputVisible={isInputVisible}
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
          <Route path="/video/:videoId" element={<VideoPage />} />
          <Route path="/create-channel" element={<CreateChannelPage />} />
          <Route path="/channel" element={<ChannelPage />} />
          <Route path="/channel/:channelId" element={<OthersChannelPage />} />
          <Route path="/create-video" element={<CreateVideoPage />} />
          <Route path="/update-video/:videoId" element={<UpdateVideoPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
