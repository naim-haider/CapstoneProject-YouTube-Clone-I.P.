import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const CreateVideoPage = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [hasChannel, setHasChannel] = useState(false);
  const userInfo = useSelector((state) => state.user.YTuserInfo);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

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

  const channelId = userInfo?.channels[0];
  //   console.log(channelId);

  useEffect(() => {
    if (userInfo?.channels?.length > 0) {
      setHasChannel(true);
    }
  }, [userInfo]);

  const token = localStorage.getItem("YTuserToken");
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  const handleCreateVideo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5005/api/videos",
        {
          title,
          description,
          thumbnailUrl,
          videoUrl,
          category,
          channelId,
        },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      console.log("video created ", data);
      //   console.log("user login data", data);
      navigate("/channel");
    } catch (err) {
      // console.log(error);
      setError("Invalid Credentials");
    }
  };
  return (
    <>
      {isLogin && hasChannel ? (
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
                <span className="pl-2 mx-1 py-2">Upload a New Video </span>
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
                      onClick={handleCreateVideo}
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
                      <span className="pl-2 mx-1">Upload</span>
                    </div>
                  </div>
                  <div className="flex-initial">
                    <Link to={"/"}>
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
      ) : (
        <div>
          {!token ? (
            <div className="md:mt-52 md:ml-32 mt-30 flex justify-center ">
              <Link
                to="/login"
                className="inline-flex items-center justify-center p-5 text-base font-medium  rounded-lg text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 me-3"
                  viewBox="0 0 22 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4151_63004)">
                    <path
                      d="M5.50085 30.1242C8.53625 30.1242 10.9998 27.8749 10.9998 25.1035V20.0828H5.50085C2.46546 20.0828 0.00195312 22.332 0.00195312 25.1035C0.00195312 27.8749 2.46546 30.1242 5.50085 30.1242Z"
                      fill="#0ACF83"
                    />
                    <path
                      d="M0.00195312 15.062C0.00195312 12.2905 2.46546 10.0413 5.50085 10.0413H10.9998V20.0827H5.50085C2.46546 20.0827 0.00195312 17.8334 0.00195312 15.062Z"
                      fill="#A259FF"
                    />
                    <path
                      d="M0.00195312 5.02048C0.00195312 2.24904 2.46546 -0.000244141 5.50085 -0.000244141H10.9998V10.0412H5.50085C2.46546 10.0412 0.00195312 7.79193 0.00195312 5.02048Z"
                      fill="#F24E1E"
                    />
                    <path
                      d="M11 -0.000244141H16.4989C19.5343 -0.000244141 21.9978 2.24904 21.9978 5.02048C21.9978 7.79193 19.5343 10.0412 16.4989 10.0412H11V-0.000244141Z"
                      fill="#FF7262"
                    />
                    <path
                      d="M21.9978 15.062C21.9978 17.8334 19.5343 20.0827 16.4989 20.0827C13.4635 20.0827 11 17.8334 11 15.062C11 12.2905 13.4635 10.0413 16.4989 10.0413C19.5343 10.0413 21.9978 12.2905 21.9978 15.062Z"
                      fill="#1ABCFE"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4151_63004">
                      <rect
                        width={22}
                        height="30.1244"
                        fill="white"
                        transform="translate(0 -0.000244141)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="w-full">Login to Upload a video</span>
                <svg
                  className="w-4 h-4 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="md:mt-52 md:ml-32 mt-30 flex justify-center">
              <Link
                to="/create-channel"
                className="inline-flex items-center justify-center p-5 text-base font-medium rounded-lg text-gray-400 bg-gray-800 hover:bg-gray-700 hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 me-3"
                  viewBox="0 0 22 31"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_4151_63004)">
                    <path
                      d="M5.50085 30.1242C8.53625 30.1242 10.9998 27.8749 10.9998 25.1035V20.0828H5.50085C2.46546 20.0828 0.00195312 22.332 0.00195312 25.1035C0.00195312 27.8749 2.46546 30.1242 5.50085 30.1242Z"
                      fill="#0ACF83"
                    />
                    <path
                      d="M0.00195312 15.062C0.00195312 12.2905 2.46546 10.0413 5.50085 10.0413H10.9998V20.0827H5.50085C2.46546 20.0827 0.00195312 17.8334 0.00195312 15.062Z"
                      fill="#A259FF"
                    />
                    <path
                      d="M0.00195312 5.02048C0.00195312 2.24904 2.46546 -0.000244141 5.50085 -0.000244141H10.9998V10.0412H5.50085C2.46546 10.0412 0.00195312 7.79193 0.00195312 5.02048Z"
                      fill="#F24E1E"
                    />
                    <path
                      d="M11 -0.000244141H16.4989C19.5343 -0.000244141 21.9978 2.24904 21.9978 5.02048C21.9978 7.79193 19.5343 10.0412 16.4989 10.0412H11V-0.000244141Z"
                      fill="#FF7262"
                    />
                    <path
                      d="M21.9978 15.062C21.9978 17.8334 19.5343 20.0827 16.4989 20.0827C13.4635 20.0827 11 17.8334 11 15.062C11 12.2905 13.4635 10.0413 16.4989 10.0413C19.5343 10.0413 21.9978 12.2905 21.9978 15.062Z"
                      fill="#1ABCFE"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_4151_63004">
                      <rect
                        width={22}
                        height="30.1244"
                        fill="white"
                        transform="translate(0 -0.000244141)"
                      />
                    </clipPath>
                  </defs>
                </svg>
                <span className="w-full">
                  Create a Channel to Upload a video
                </span>
                <svg
                  className="w-4 h-4 ms-2 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default CreateVideoPage;
