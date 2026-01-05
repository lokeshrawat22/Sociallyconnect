import { useEffect, useState } from "react";
import API from "../api";
import FollowButton from "./FollowButton";
import CommentPost from "./CommentPost";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaRegComment } from "react-icons/fa";
import { FcLike, FcLikePlaceholder } from "react-icons/fc";
import { GoShareAndroid } from "react-icons/go";

const PostCard = ({ post, currentUserId, refresh, hideFollow = false }) => {
  const [openComments, setOpenComments] = useState(false);

  const loggedInUserId =
    currentUserId || JSON.parse(localStorage.getItem("user"))?._id;

  const [isFollowing, setIsFollowing] = useState(post.user?.isFollowed);

  useEffect(() => {
    setIsFollowing(post.user?.isFollowed);
  }, [post.user?.isFollowed]);

  const isMyPost =
    String(post.user?._id) === String(loggedInUserId);

  /* ================= LIKE POST ================= */
  const likePost = async () => {
    try {
      await API.put(`/auth/posts/${post._id}/like`);
      refresh && refresh();
    } catch {
      toast.error("Could not like post");
    }
  };

  const sharePost = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/post/${post._id}`
    );
    toast.info("Post link copied!");
  };

  const isLiked = post.likes?.includes(loggedInUserId);

  return (
    <>
      <div className="bg-white rounded-2xl shadow-md p-4 
                      w-[320px] h-112.5 flex flex-col gap-2.5">

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <img
              src={post.user?.profilePic || "/default-avatar.png"}
              alt="avatar"
              className="w-9 h-9 rounded-full object-cover"
            />

            <Link to={`/userprofile/${post.user?._id}`}>
              <p className="font-semibold text-sm">
                @{post.user?.username}
              </p>
            </Link>
          </div>

          {!hideFollow && !isMyPost && (
            <FollowButton
              userId={post.user?._id}
              currentUserId={loggedInUserId}
              isInitiallyFollowing={isFollowing}
            />
          )}
        </div>

        {post.mediaType === "image" ? (
          <img
            src={post.media}
            alt="post"
            className="w-full h-52 object-cover rounded-xl"
          />
        ) : (
          <video
            src={post.media}
            controls
            className="w-full h-52 object-cover rounded-xl"
          />
        )}

        <div className="mt-3">
          <h4 className="font-semibold text-sm">
            {post.title}
          </h4>
          <div className="text-sm text-gray-600 mt-1 
                          max-h-16 overflow-y-auto no-scrollbar">
            {post.description}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-3">
          <button
            onClick={likePost}
            className="flex items-center gap-1 text-gray-400 font-semibold"
          >
            {isLiked ? <FcLike /> : <FcLikePlaceholder />}
            <span className="text-sm">
              {post.likes?.length || 0}
            </span>
          </button>

          <button
            onClick={() => setOpenComments(true)}
            className="flex items-center gap-1 text-gray-700 hover:text-blue-600"
          >
            <FaRegComment />
            <span className="text-sm">
              {post.commentCount}
            </span>
          </button>

          <button
            onClick={sharePost}
            className="text-xl"
          >
            <GoShareAndroid />
          </button>
        </div>
      </div>

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
