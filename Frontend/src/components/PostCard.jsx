import { useEffect, useState } from "react";
import API from "../api";
import FollowButton from "./FollowButton";
import CommentPost from "./CommentPost";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { FcLike,FcLikePlaceholder } from "react-icons/fc";
import { GoShareAndroid } from "react-icons/go";
const PostCard = ({ post, currentUserId, refresh, hideFollow = false }) => {
  const [openComments, setOpenComments] = useState(false);

  // ✅ logged-in user id (safe fallback)
  const loggedInUserId =
    currentUserId || JSON.parse(localStorage.getItem("user"))?._id;

  const [isFollowing, setIsFollowing] = useState(post.user?.isFollowed);

  useEffect(() => {
    setIsFollowing(post.user?.isFollowed);
  }, [post.user?.isFollowed]);

  // ✅ check: is my own post
  const isMyPost =
    String(post.user?._id) === String(loggedInUserId);

  // ❤️ LIKE
  const likePost = async () => {
    try {
      await API.put(`/auth/posts/${post._id}/like`);
      refresh && refresh();
    } catch {
      toast.error("Could not like post");
    }
  };

  // 🔁 SHARE
  const sharePost = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/auth/post/${post._id}`
    );
    toast.info("Post link copied!");
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-4 
                      w-[320px] h-[450px] flex flex-col gap-2.5">

        {/* USER INFO */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={
                post.user?.profilePic
                  ? `http://localhost:3000/uploads/posts/${post.user.profilePic}`
                  : "/default-avatar.png"
              }
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />

            <Link to={`/userprofile/${post.user._id}`}>
              <p className="font-semibold text-sm">
                @{post.user?.username}
              </p>
            </Link>
          </div>

          {/* ✅ FOLLOW BUTTON (FINAL LOGIC) */}
          {!hideFollow && !isMyPost && (
            <FollowButton
              userId={post.user._id}
              currentUserId={loggedInUserId}
              isInitiallyFollowing={isFollowing}
            />
          )}
        </div>

        {/* MEDIA */}
        {post.mediaType === "image" ? (
          <img
            src={`http://localhost:3000/uploads/posts/${post.media}`}
            className="w-full h-52 object-cover rounded-xl"
            alt="post"
          />
        ) : (
          <video
            src={`http://localhost:3000/uploads/posts/${post.media}`}
            controls
            className="w-full h-52 object-cover rounded-xl"
          />
        )}

        {/* CONTENT */}
        <div className="mt-3">
          <h4 className="font-semibold text-sm">{post.title}</h4>
          <div className="text-sm text-gray-600 mt-1 
                          max-h-16 overflow-y-auto no-scrollbar">
            {post.description}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center justify-between mt-auto pt-3">
          <button
            onClick={likePost}
            className="flex items-center gap-1 text-gray-400 font-semibold"
          >
          {likePost?<FcLike /> :<FcLikePlaceholder />} {post.likes.length} <p className="text-gray-400 text-sm">likes</p>
          </button>

         <button
  onClick={() => setOpenComments(true)}
  className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
>
<FaRegComment /><span className="text-sm">{post.commentCount}</span><p className="text-gray-400 text-sm">Comments</p>
</button>

          <button
            onClick={sharePost}
            className="text-xl"
          >
           <GoShareAndroid />
          </button>
        </div>
      </div>

      {/* COMMENTS MODAL */}
      {openComments && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-xl relative w-full max-w-md">
            <button
              onClick={() => setOpenComments(false)}
              className="absolute top-2 right-3 text-xl"
            >
              ✖
            </button>
            <CommentPost postId={post._id} refresh={refresh} />
          </div>
        </div>
      )}
    </>
  );
};

export default PostCard;
