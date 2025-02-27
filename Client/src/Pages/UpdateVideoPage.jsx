import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { setChannels } from "../redux/slices/channelSlice";

const UpdateVideoPage = () => {
  const { videoId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the channel data from Redux state
  const channels = useSelector((state) => state.channels.channels);

  // Fetch video details when the component mounts
  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5005/api/videos/${videoId}`,
          {
            headers: {
              Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
            },
          }
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
        setThumbnailUrl(response.data.thumbnailUrl);
        setVideoUrl(response.data.videoUrl);
        setCategory(response.data.category);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details", error);
      }
    };

    fetchVideoDetails();
  }, [videoId]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Send PUT request to update the video details
      const updatedVideo = {
        title,
        description,
        thumbnailUrl,
        videoUrl,
        category,
      };

      const response = await axios.put(
        `http://localhost:5005/api/videos/${videoId}`,
        updatedVideo,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );

      // Update the video in Redux state after successful update
      const updatedVideos = channels?.channel?.videos?.map((video) =>
        video._id === videoId
          ? { ...video, title, description, thumbnailUrl, videoUrl, category }
          : video
      );

      dispatch(
        setChannels({
          ...channels,
          channel: { ...channels.channel, videos: updatedVideos },
        })
      );

      navigate("/channel");
    } catch (error) {
      console.log(error);
      setError("Error while updating video");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const categories = [
    "Game",
    "Music",
    "News",
    "Cricket",
    "Football",
    "Learn Coding",
    "React routers",
    "Computer programming",
    "Reverberation",
    "Movie musicals",
    "India national cricket team",
    "Mixes",
    "1990s",
    "Telugu cinema",
    "Live",
    "Dramedy",
    "Dubbing",
    "Indian soap opera",
  ];

  return (
    <>
      <div className="flex h-full mt-20 md:mt-32 ">
        <div className="m-auto xl:m-auto lg:mr-4 shadow-xl shadow-red-100 ">
          <div className="">
            <div className="relative w-full flex justify-center items-center px-5 py-2 font-medium tracking-wide text-white   bg-[#fe0000] rounded-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                enableBackground="new 0 0 24 24"
                height="24px"
                viewBox="0 0 24 24"
                width="24px"
                fill="#FFFFFF"
              >
                <g>
                  <rect fill="none" height={24} width={24} />
                </g>
                <g>
                  <g>
                    <path d="M19,13h-6v6h-2v-6H5v-2h6V5h2v6h6V13z" />
                  </g>
                </g>
              </svg>
              <span className="pl-2 mx-1 py-2">Update the Video </span>
            </div>
            <div className="mt-5 rounded-lg ">
              <div className="px-5 py-5">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className=" text-black  placeholder-gray-600 placeholder:pl-4 w-full px-4 py-3 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-300  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  placeholder="Description"
                  className=" text-black placeholder-gray-600 w-full px-4 py-3 placeholder:pl-4 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-300  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <input
                  type="text"
                  value={thumbnailUrl}
                  onChange={(e) => setThumbnailUrl(e.target.value)}
                  required
                  placeholder="Thumbnail URL"
                  className=" text-black placeholder-gray-600 w-full px-4 py-3 placeholder:pl-4 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-300  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                  placeholder="Video URL"
                  className=" text-black placeholder-gray-600 w-full px-4 py-3 placeholder:pl-4 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <div className="text-black w-full px-4 py-3 placeholder:pl-4 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-300 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400">
                  <label htmlFor="choices" className="text-gray-400">
                    Choose an option:{" "}
                  </label>
                  <select
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    id="choices"
                    name="choices"
                    className="cursor-pointer"
                  >
                    {categories?.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <hr className="mt-4" />
              <div className="flex flex-row-reverse items-center px-3 py-6">
                <div className="flex-initial pl-3">
                  <div
                    onClick={handleUpdate}
                    className="flex items-center px-5 py-1 font-medium tracking-wide text-white capitalize cursor-pointer bg-[#fe0000] rounded-md "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 0 24 24"
                      width="24px"
                      fill="#FFFFFF"
                    >
                      <path d="M0 0h24v24H0V0z" fill="none" />
                      <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-4H7l5-5 5 5h-3v4h-2v-4z"
                        opacity=".3"
                      />
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14h-2v-4H7l5-5 5 5h-3v4h-2v-4z" />
                    </svg>
                    <span className="pl-2 mx-1">Update</span>
                  </div>
                </div>
                <div className="flex-initial">
                  <Link to={"/channel"}>
                    <div className="flex items-center px-5 py-1 font-medium tracking-wide capitalize rounded-md border-2 border-red-600 cursor-pointer hover:bg-[#fe0000] hover:text-white hover:fill-current text-red-600  transition duration-300 transform ease-in-out">
                      <span className="pl-2 mx-1 bg">Cancel</span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="flex -mb-10 justify-center mt-6">
                <div className=" text-sm text-gray-200">
                  {error && <p style={{ color: "red" }}>{error}</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateVideoPage;
