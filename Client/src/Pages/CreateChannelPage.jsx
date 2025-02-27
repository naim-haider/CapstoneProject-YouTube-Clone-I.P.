import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addChannel } from "../redux/slices/channelSlice";
import { addChannelToUser } from "../redux/slices/userSlice";

const CreateChannelPage = () => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");
  const [channelBanner, setChannelBanner] = useState("");
  const [error, setError] = useState("");
  const userInfo = useSelector((state) => state.user.YTuserInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCreateChannel = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5005/api/channels",
        {
          channelName,
          description,
          channelBanner,
        },
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("YTuserToken")}`,
          },
        }
      );
      // console.log("channel data", data);
      dispatch(addChannel({ channels: data }));
      if (userInfo) {
        dispatch(addChannelToUser(data._id)); // Add channel ID to user's list
      }
      navigate("/channel");
    } catch (error) {
      setError("Invalid Credentials", error);
    }
  };
  return (
    <>
      <div className="flex h-full mt-20 md:mt-34 ">
        <div className="m-auto shadow-xl shadow-red-100">
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
              <span className="pl-2 mx-1 py-2">Create Your Own Channel </span>
            </div>
            <div className="mt-5 rounded-lg">
              <div className="px-5 py-5">
                <input
                  type="text"
                  placeholder="Enter Channel name"
                  value={channelName}
                  onChange={(e) => setChannelName(e.target.value)}
                  required
                  className=" text-black  placeholder-gray-600 placeholder:pl-4 w-full px-4 py-3 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-300  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className=" text-black placeholder-gray-600 w-full px-4 py-3 placeholder:pl-4 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-300  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
                <input
                  type="text"
                  placeholder="Give Channel Banner Link"
                  value={channelBanner}
                  onChange={(e) => setChannelBanner(e.target.value)}
                  required
                  className=" text-black placeholder-gray-600 w-full px-4 py-3 placeholder:pl-4 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-gray-300  focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 ring-gray-400"
                />
              </div>
              <hr className="mt-4" />
              <div className="flex flex-row-reverse items-center px-3 py-6">
                <div className="flex-initial pl-3">
                  <div
                    onClick={handleCreateChannel}
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
                    <span className="pl-2 mx-1">Create</span>
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
    </>
  );
};

export default CreateChannelPage;
