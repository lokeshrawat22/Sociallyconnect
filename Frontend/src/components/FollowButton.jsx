import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const FollowButton = ({ userId, currentUserId, isInitiallyFollowing }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  // 🚫 Prevent self-follow
  if (!userId || userId === currentUserId) return null;

  // 🔄 Sync follow state
  useEffect(() => {
    setIsFollowing(!!isInitiallyFollowing);
  }, [isInitiallyFollowing]);

  const toggleFollow = async () => {
    if (loading) return;

    try {
      setLoading(true);
      await API.put(`/auth/users/${userId}/follow`);
      setIsFollowing(prev => !prev);

      toast.success(isFollowing ? "Unfollowed" : "Followed");
    } catch (error) {
      toast.error("Failed to update follow status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFollow}
      disabled={loading}
      className={`
        px-5 py-1.5 rounded-full text-sm font-medium
        transition-all duration-200
        disabled:opacity-60 disabled:cursor-not-allowed
        ${
          isFollowing
            ? "border border-[#FFD3CD] text-[#FF6B5E] bg-white hover:bg-[#FF6B5E] hover:text-white"
            : "bg-[#FF6B5E] text-white hover:bg-[#E85A4F]"
        }
      `}
    >
      {loading ? "Please wait..." : isFollowing ? "Following" : "Follow"}
    </button>
  );
};

export default FollowButton;
