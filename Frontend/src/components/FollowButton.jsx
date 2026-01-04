import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const FollowButton = ({ userId, currentUserId, isInitiallyFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🚫 Prevent self-follow
  if (!userId || userId === currentUserId) return null;

  // ✅ SYNC FOLLOW STATE AFTER REFRESH
  useEffect(() => {
    setIsFollowing(!!isInitiallyFollowing);
  }, [isInitiallyFollowing]);

  const toggleFollow = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await API.put(`/auth/users/${userId}/follow`);

      setIsFollowing(prev => !prev);

      toast.success(
        isFollowing ? "Unfollowed successfully" : "Followed successfully"
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update follow status"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className={`px-3 py-1 rounded text-sm transition ${
        isFollowing
          ? "bg-gray-300 text-black hover:bg-gray-400"
          : "bg-indigo-600 text-white hover:bg-indigo-700"
      } disabled:opacity-60`}
    >
      {loading ? "Please wait..." : isFollowing ? "Unfollow" : "Follow"}
    </button>
  );
};

export default FollowButton;
