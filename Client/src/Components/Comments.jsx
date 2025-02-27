import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getComments,
  editComment,
  deleteComment,
} from "../redux/slices/commentSlice";
import { MdPerson } from "react-icons/md";
import { getTimeDuration } from "../utils/uploadTime";
import axios from "axios";

const Comments = ({ videoId }) => {
  const dispatch = useDispatch();
  const { comments, loading, error } = useSelector((state) => state.comments);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [isOpen, setIsOpen] = useState(null);
  const users = JSON.parse(localStorage.getItem("users"));
  const userInfo = useSelector((state) => state.user.YTuserInfo);
  // console.log(userInfo);

  // console.log("comments", comments);

  useEffect(() => {
    dispatch(getComments(videoId));
  }, [videoId, dispatch]);
  // console.log(videoId);

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(addComment({ videoId, text: newComment }));
      setNewComment("");
    }
  };

  const handleEditComment = (commentId) => {
    dispatch(editComment({ videoId, commentId, text: editedText }));
    setEditingComment(null);
  };

  const handleDeleteComment = (commentId) => {
    dispatch(deleteComment({ videoId, commentId }));
  };

  // Function to toggle modal visibility
  const toggleModal = (commentId) => {
    setIsOpen(isOpen === commentId ? null : commentId);
  };

  // === getting user data === //
  // Fetch users when the component first mounts
  useEffect(() => {
    const fetchUsers = async () => {
      if (!users) {
        try {
          const response = await axios.get("http://localhost:5005/api/users");
          localStorage.setItem("users", JSON.stringify(response.data)); // Store users in localStorage
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    };

    fetchUsers();
  }, []);

  // Fetch all users for the comments when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/users`);
        localStorage.setItem("users", JSON.stringify(response.data));
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [comments]);
  // console.log("users", users);

  if (loading) return <p>Loading comments...</p>;
  if (error) return <p>{error.message}</p>;
  // console.log(isOpen, "isopen");

  return (
    <div className="h-full">
      {userInfo && (
        <div>
          <form
            className="w-full flex items-center gap-2 my-5"
            onSubmit={(e) => {
              e.preventDefault();
              handleAddComment();
            }}
          >
            <MdPerson className="text-3xl text-black" />
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              type="text"
              name="newComment"
              id="newComment"
              required
              placeholder="Add a comment..."
              className="w-full focus:outline-none border-b bg-white border-slate-950 "
            />
            <input
              type="submit"
              value="Submit"
              className="px-3 py-1 border-none rounded-full text-black hover:cursor-pointer "
            />
          </form>
        </div>
      )}

      <div>
        {comments?.map((comment) => {
          const user = users.filter((user) => user._id === comment.userId);
          // console.log("user", user);
          // console.log(comment);

          const uploadTime = getTimeDuration(comment?.updatedAt);
          return (
            <div key={comment._id}>
              {editingComment === comment._id ? (
                <div>
                  <form className="w-full flex items-center gap-2 my-5">
                    <MdPerson className="text-3xl text-black" />
                    <input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      type="text"
                      name="newComment"
                      id="newComment"
                      required
                      placeholder="Add a comment..."
                      className="w-full focus:outline-none border-b bg-gray-100 px-3 py-2 border-slate-950"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditComment(comment._id);
                        toggleModal();
                      }}
                      className="px-3 py-1 border-none rounded-full text-black hover:cursor-pointer "
                    >
                      Save
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div
                    key={comment?._id}
                    className="flex gap-3 my-4 items-center  text-black"
                  >
                    <div>
                      <img
                        src={user[0]?.avatar}
                        alt="avatar"
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex gap-3">
                        <h4 className="font-medium text-black text-xs sm:text-sm">
                          {user[0]?.userName}
                        </h4>
                        <h5 className="font-normal text-gray-500 text-xs sm:text-sm">
                          {uploadTime}
                        </h5>
                      </div>
                      <p className="mt-1 text-base text-black w-[70%] md:w-[80%]">
                        {comment?.text}
                      </p>
                    </div>
                  </div>
                  <div className=" absolute right-4 xl:right-110">
                    <div
                      className={`${
                        isOpen === comment?._id ? "hidden" : "block"
                      }`}
                    >
                      <i
                        className={`fa-solid fa-ellipsis-vertical cursor-pointer `}
                        onClick={() => toggleModal(comment?._id)}
                      ></i>
                    </div>
                    {isOpen === comment?._id &&
                      comment?.userId === userInfo?._id && (
                        <div>
                          <div className="relative p-3 w-full max-w-2xl max-h-full">
                            <div className="flex justify-center items-center gap-3 relative left-4 ">
                              <div className="flex items-center gap-3">
                                <button
                                  onClick={() => {
                                    setEditingComment(comment?._id);
                                    setEditedText(comment?.text);
                                  }}
                                  className="font-medium text-sm"
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteComment(comment?._id)
                                  }
                                  className=" text-sm font-medium"
                                >
                                  Delete
                                </button>
                              </div>
                              <div className="flex justify-end">
                                <svg
                                  onClick={toggleModal}
                                  className="w-3 h-3 cursor-pointer"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    {isOpen === comment?._id &&
                      comment?.userId !== userInfo?._id && (
                        <div>
                          <div className="relative p-3 w-full max-w-2xl max-h-full">
                            <div className="flex justify-center items-center gap-3 relative left-4 ">
                              <div className="flex items-center gap-3">
                                <button className=" text-sm font-medium cursor-pointer">
                                  report
                                </button>
                              </div>
                              <div className="flex justify-end">
                                <svg
                                  onClick={toggleModal}
                                  className="w-3 h-3 cursor-pointer"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 14 14"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                  />
                                </svg>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
