import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/slices/userSlice";

const Header = ({
  onToggleSidebar,
  isOpen,
  setSearchQuery,
  onSearch,
  isInputVisible,
}) => {
  const [isLogin, setIsLogin] = useState(false);
  const [hasChannel, setHasChannel] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const userInfo = useSelector((state) => state.user.YTuserInfo);
  const navigate = useNavigate();
  // console.log(userInfo);
  useEffect(() => {
    if (userInfo?.channels.length > 0) {
      setHasChannel(true);
    } else {
      setHasChannel(false);
    }
  }, [userInfo]);
  // console.log(hasChannel);

  const token = localStorage.getItem("YTuserToken");
  useEffect(() => {
    if (token) {
      setIsLogin(true);
    }
  }, [token]);

  const handleLogout = () => {
    if (isLogin) {
      dispatch(logoutUser());
      localStorage.removeItem("YTuserToken");
      localStorage.removeItem("YTuserInfo");
      localStorage.removeItem("channels");
      setIsLogin(false);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (isInputVisible) {
      setQuery("");
    }
  }, [isInputVisible]);

  const handleSearchChange = (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);
    setSearchQuery(searchQuery); // Pass the search query to parent component
  };

  const handleClearSearch = () => {
    setQuery("");
    setSearchQuery("");
    onSearch();
  };
  return (
    <>
      <nav className="h-[7%] w-screen bg-white z-50 fixed top-0 md:h-[11%] lg:h-[8%] xl:h-[12%] px-5 md:py-3 py-8 flex justify-between">
        <div className="flex ml-2 gap-3 items-center">
          <div
            onClick={onToggleSidebar}
            className="h-14 w-14 p-3 bg-white hidden md:flex md:flex-col md:items-center ml-4 md:justify-center rounded-full hover:bg-slate-200 cursor-pointer"
          >
            <div className="w-8 h-0.5 bg-black mb-1.5" />
            <div className="w-8 h-0.5 bg-black mb-1.5" />
            <div className="w-8 h-0.5 bg-black" />
          </div>
          <Link to={"/"}>
            <div className="h-10 flex justify-center items-center cursor-pointer">
              <img
                src="/logo.png"
                alt="youtube-icon"
                className="md:h-14 w-48"
              />
            </div>
          </Link>
        </div>
        <div className="hidden lg:flex md:items-center xl:w-6/12 md:mr-[13%]">
          <div className="h-16 w-[50%] xl:w-[100%] flex relative justify-end items-center">
            <input
              type="text"
              value={query}
              onChange={handleSearchChange}
              className="h-full w-10/12 lg:w-full font-medium text-2xl text-black  px-8 py-1 rounded-l-full border-2 border-slate-300 focus:outline-blue-400 placeholder:font-normal placeholder:pl-4 placeholder:text-2xl"
              placeholder="Search"
            />
            <div
              onClick={onSearch}
              className="absolute h-16 w-26 bg-slate-100 border-2 cursor-pointer left-[99.8%] border-slate-300 flex justify-center items-center  rounded-r-full"
            >
              <i className="fa-solid fa-xl mt-1 fa-magnifying-glass" />
            </div>
            <div className="absolute h-16 w-16 bg-slate-100 cursor-pointer hover:bg-slate-200 xl:left-[123%] lg:-right-[175%] border-slate-300 flex justify-center items-center rounded-full">
              <i className="fa-solid fa-microphone fa-lg" />
            </div>
          </div>
        </div>
        {/* only for tab */}
        <div className="hidden md:flex lg:hidden md:items-center md:mr-[%]">
          <div className="h-16 w-full flex relative justify-end items-center">
            <div
              onClick={onSearch}
              className={`absolute z-100 ${
                isInputVisible ? "-right-90" : "right-3"
              }`}
            >
              <i className="fa-solid fa-xl fa-magnifying-glass" />
            </div>
            <div className="absolute cursor-pointer left-4 flex justify-center items-center">
              <i className="fa-solid  fa-microphone fa-lg" />
            </div>
          </div>
        </div>

        <div className="flex md:gap-3 items-center">
          <Link to={"/create-video"}>
            <div className="h-16 w-40 hidden md:flex gap-3 md:justify-center md:items-center rounded-full cursor-pointer  bg-slate-100 hover:bg-slate-200">
              <i className="fa-solid fa-xl fa-plus fa-lg ml-0" />
              <span className="mr-0 font-medium text-2xl">Create</span>
            </div>
          </Link>
          <div className="h-16 w-16 md:hidden flex justify-center items-center cursor-pointer rounded-full  hover:bg-slate-200">
            <i className="fa-solid fa-tv fa-lg" />
          </div>
          <div className="h-16 w-16 flex justify-center items-center cursor-pointer rounded-full hover:bg-slate-200">
            <i className="fa-regular fa-xl fa-bell fa-lg" />
          </div>
          {/* for mobile search */}
          <div
            onClick={onSearch}
            className="h-16 w-16 md:hidden flex z-100 justify-center items-center cursor-pointer rounded-full  hover:bg-slate-200"
          >
            <i className="fa-solid fa-magnifying-glass fa-lg" />
          </div>
          {isInputVisible && (
            <div className="flex items-center lg:hidden absolute z-50 bg-white left-0">
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                className="h-full w-screen font-medium text-xl md:text-2xl text-black px-12 md:pl-16 py-2 md:py-5 rounded-full border-2 border-slate-300 focus:outline-blue-400 placeholder:font-normal placeholder:pl-4 placeholder:text-2xl"
                placeholder="Search"
              />
              <div
                onClick={handleClearSearch}
                className="absolute left-5 md:left-8 cursor-pointer"
              >
                <i className="fa-solid fa-times fa-lg text-gray-500" />
              </div>
            </div>
          )}
          <div className=" hidden md:flex justify-center items-center cursor-pointer md:mr-2 rounded-full hover:bg-slate-200">
            {/*  */}
            {isLogin ? (
              <div className="hidden md:flex items-center space-x-5">
                <div
                  onClick={() => setOpen(!open)}
                  className={`relative  border-b-4 border-transparent  ${
                    open
                      ? "border-indigo-700 transform transition duration-300"
                      : ""
                  }`}
                >
                  <div className="flex justify-center items-center space-x-3 cursor-pointer hover:scale-110 transition duration-700 ease-in-out">
                    <div className="w-12 h-12 bg-black flex items-center justify-center rounded-full overflow-hidden">
                      {userInfo.avatar == "" ? (
                        <p className="text-[#f7f1f0] text-2xl font-serif">
                          {userInfo?.userName[0].toUpperCase()}
                        </p>
                      ) : (
                        <img src={userInfo.avatar} alt="avatarImg" />
                      )}
                    </div>
                  </div>

                  {open && (
                    <div className="absolute right-0 w-60 px-5 py-3 bg-white rounded-lg shadow border mt-5">
                      <ul className=" z-40 dark:text-white">
                        <li className="font-serif font-thin flex flex-col items-center justify-center mb-2">
                          <div className="w-8 h-8 bg-black flex items-center justify-center rounded-full overflow-hidden">
                            <p className="text-[#f7f1f0]">
                              {userInfo?.userName[0].toUpperCase()}
                            </p>
                          </div>
                          <p className="mt-1 text-black">{userInfo.userName}</p>
                          <p className="mt-1 text-black">{userInfo.email}</p>
                        </li>
                        <hr className="border-gray-400" />
                        {hasChannel ? (
                          <Link to={"/channel"}>
                            <li className="font-medium text-black py-3 text-center rounded-xl hover:bg-gray-200">
                              Go to Channel
                            </li>
                          </Link>
                        ) : (
                          <Link to={"/create-channel"}>
                            <li className="font-medium text-black py-3 text-center rounded-xl hover:bg-gray-200">
                              Create Channel
                            </li>
                          </Link>
                        )}
                        <hr className="border-gray-400" />
                        <li className="font-medium mt-3">
                          <div
                            onClick={handleLogout}
                            className="flex text-black items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                          >
                            <div className="mr-3 cursor-pointer text-red-600">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </div>
                            Logout
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                onClick={() => setOpen(!open)}
                className={`relative z-50 hidden md:flex border-b-4 border-transparent  ${
                  open
                    ? "border-indigo-700 transform transition duration-300"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center space-x-3 cursor-pointer hover:scale-110 transition duration-700 ease-in-out">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full overflow-hidden">
                    <img
                      className="rounded-full"
                      src="https://th.bing.com/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?rs=1&pid=ImgDetMain"
                      alt="noProfileImg"
                    />
                  </div>
                </div>

                {open && (
                  <div className="absolute mt-10 right-0 w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent">
                    <ul className="space-y-3 dark:text-white">
                      <li className="font-serif font-thin flex flex-col items-center justify-center">
                        <div className="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden">
                          <img
                            className="rounded-full"
                            src="https://th.bing.com/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?rs=1&pid=ImgDetMain"
                            alt="noProfileImg"
                          />
                        </div>
                        <p className="mt-1 font-thin text-gray-400">
                          Login to see the details
                        </p>
                      </li>
                      <hr className="dark:border-gray-700" />
                      <li className="font-medium">
                        <Link to={"/login"} className="cursor-pointer">
                          <div className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-green-600">
                            <div className="mr-3 cursor-pointer text-green-600">
                              <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                />
                              </svg>
                            </div>
                            Login
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>
      <>
        {!isOpen ? (
          <div
            className="hidden fixed top-18 lg:block lg:px-3 md:overflow-auto md:h-screen xl:w-[10%] w-[16%]  -ml-5"
            id="left-bar"
          >
            <div className="w-full">
              <Link to={"/"}>
                <div className="h-10 w-[70%] gap-2 mt-5 py-12 pl-6 flex flex-col justify-center items-center hover:bg-slate-100 rounded-md cursor-pointer ">
                  <div className="w-7 h-7">
                    <i className="fa-solid fa-xl fa-house fa-lg " />
                  </div>
                  <div className="text-md font-sans">Home</div>
                </div>
              </Link>
              <div className="h-10 w-[80%] gap-2 py-12 flex flex-col justify-center items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
                <div className="w-3 h-7">
                  <i className="fa-regular fa-xl fa-file-video fa-lg" />
                </div>
                <div className="text-md  font-sans">Shorts</div>
              </div>
              <div className="h-10  w-[80%] gap-2 py-12 flex flex-col justify-center items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
                <div className="w-7 h-7">
                  <i className="fa-regular fa-xl fa-folder fa-lg" />
                </div>
                <div className=" text-md  font-sans">Subscription</div>
              </div>
              <div className="h-10  w-[80%] gap-2 py-12 flex flex-col justify-center items-center rounded-md cursor-pointer hover:bg-slate-100 px-2">
                <div className="">
                  <i className="fa-regular fa-xl fa-user"></i>
                </div>
                <div className=" text-md font-sans">You</div>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </>
      <section className="fixed z-50 flex gap-1 bottom-0 w-full h-16 border-t md:hidden bg-white">
        <div className="w-[19%] h-full flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-lg">
          <Link to={"/"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </Link>
        </div>
        <div className="w-[19%] h-full flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-9 h-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
            />
          </svg>
        </div>
        <div className="w-[19%] h-full flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-lg">
          <Link to={"/create-video"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-9 h-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </Link>
        </div>
        <div className="w-[19%] h-full flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-9 h-9"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 0 0-1.883 2.542l.857 6a2.25 2.25 0 0 0 2.227 1.932H19.05a2.25 2.25 0 0 0 2.227-1.932l.857-6a2.25 2.25 0 0 0-1.883-2.542m-16.5 0V6A2.25 2.25 0 0 1 6 3.75h3.879a1.5 1.5 0 0 1 1.06.44l2.122 2.12a1.5 1.5 0 0 0 1.06.44H18A2.25 2.25 0 0 1 20.25 9v.776"
            />
          </svg>
        </div>
        <div className="w-[19%] h-full flex justify-center items-center cursor-pointer hover:bg-slate-100 rounded-lg">
          {isLogin ? (
            <div className="md:hidden flex items-center space-x-5">
              <div
                onClick={() => setOpen(!open)}
                className={`relative  border-b-4 border-transparent  ${
                  open
                    ? "border-indigo-700 transform transition duration-300"
                    : ""
                }`}
              >
                <div className="flex justify-center items-center space-x-3 cursor-pointer hover:scale-110 transition duration-700 ease-in-out">
                  <div className="w-10 h-10 bg-black flex items-center justify-center rounded-full overflow-hidden">
                    {userInfo.avatar == "" ? (
                      <p className="text-[#f7f1f0] text-xl font-serif">
                        {userInfo?.userName[0].toUpperCase()}
                      </p>
                    ) : (
                      <img src={userInfo.avatar} alt="avatarImg" />
                    )}
                  </div>
                </div>

                {open && (
                  <div className="absolute bottom-14 right-2 w-60 px-5 py-3 bg-white rounded-lg shadow border mt-5">
                    <ul className="space-y-3 z-40 dark:text-white">
                      <li className="font-serif font-thin flex flex-col items-center justify-center">
                        <div className="w-8 h-8 bg-black flex items-center justify-center rounded-full overflow-hidden">
                          <p className="text-[#f7f1f0]">
                            {userInfo?.userName[0].toUpperCase()}
                          </p>
                        </div>
                        <p className="mt-1 text-black">{userInfo.userName}</p>
                        <p className="mt-1 text-black">{userInfo.email}</p>
                      </li>
                      <hr className="border-gray-400" />
                      {hasChannel ? (
                        <Link to={"/channel"}>
                          <li className="font-medium text-black pb-3 text-center rounded-xl hover:bg-gray-200">
                            Go to Channel
                          </li>
                        </Link>
                      ) : (
                        <Link to={"/create-channel"}>
                          <li className="font-medium text-black py-3 text-center rounded-xl hover:bg-gray-200">
                            Create Channel
                          </li>
                        </Link>
                      )}
                      <hr className="border-gray-400" />
                      <li className="font-medium">
                        <div
                          onClick={handleLogout}
                          className="flex text-black items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
                        >
                          <div className="mr-3 cursor-pointer text-red-600">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          </div>
                          Logout
                        </div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div
              onClick={() => setOpen(!open)}
              className={`relative z-50 md:hidden flex border-b-4 border-transparent  ${
                open
                  ? "border-indigo-700 transform transition duration-300"
                  : ""
              }`}
            >
              <div className="flex justify-center items-center space-x-3 cursor-pointer hover:scale-110 transition duration-700 ease-in-out">
                <div className="w-10 h-10 flex items-center justify-center rounded-full overflow-hidden">
                  <img
                    className="rounded-full"
                    src="https://th.bing.com/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?rs=1&pid=ImgDetMain"
                    alt="noProfileImg"
                  />
                </div>
              </div>

              {open && (
                <div className="absolute mt-10 bottom-12 right-2 w-60 px-5 py-3 dark:bg-gray-800 bg-white rounded-lg shadow border dark:border-transparent">
                  <ul className="space-y-3 dark:text-white">
                    <li className="font-serif font-thin flex flex-col items-center justify-center">
                      <div className="w-7 h-7 flex items-center justify-center rounded-full overflow-hidden">
                        <img
                          className="rounded-full"
                          src="https://th.bing.com/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?rs=1&pid=ImgDetMain"
                          alt="noProfileImg"
                        />
                      </div>
                      <p className="mt-1 font-thin text-gray-400">
                        Login to see the details
                      </p>
                    </li>
                    <hr className="dark:border-gray-700" />
                    <li className="font-medium">
                      <Link to={"/login"} className="cursor-pointer">
                        <div className="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-green-600">
                          <div className="mr-3 cursor-pointer text-green-600">
                            <svg
                              className="w-6 h-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                              />
                            </svg>
                          </div>
                          Login
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Header;
