import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api";
import FollowButton from "../components/FollowButton";
import PostCard from "../components/PostCard";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ✅ logged-in user
  const currentUser = JSON.parse(localStorage.getItem("user"));

  // 🔥 REDIRECT IF OWN PROFILE
  useEffect(() => {
    if (currentUser && String(currentUser._id) === String(id)) {
      navigate("/profile", { replace: true });
    }
  }, [id, currentUser, navigate]);

  const isOwnProfile =
    String(currentUser?._id) === String(id);

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && !isOwnProfile) {
      fetchProfile();
      fetchPosts();
    }
  }, [id, isOwnProfile]);

  const fetchProfile = async () => {
    try {
      const res = await API.get(`/auth/users/${id}/userProfile`);
      setUser(res.data);
    } catch (err) {
      console.error("Failed to fetch user profile");
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await API.get(`/auth/posts/user/${id}`);
      setPosts(res.data || []);
    } catch (err) {
      console.error("Failed to fetch user posts");
    } finally {
      setLoading(false);
    }
  };

  // ✅ START CHAT
  const startChat = async () => {
    try {
      const res = await API.get(`/auth/conversation/${id}`);
      navigate(`/messages/${res.data._id}`);
    } catch (err) {
      console.error("Failed to start chat", err);
    }
  };

  if (isOwnProfile) return null; // redirect ho raha hai
  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 mt-12">

      {/* PROFILE CARD */}
      <div className="bg-white rounded-2xl shadow-lg p-6
                      flex flex-col md:flex-row
                      md:items-center md:justify-between gap-6">

        {/* LEFT */}
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <img
            src={
              user.profilePic
                ? `http://localhost:3000/uploads/posts/${user.profilePic}`
                : "/default-avatar.png"
            }
            alt="profile"
            className="w-32 h-32 rounded-full object-cover"
          />

          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">@{user.username}</p>
            <p className="text-gray-500">{user.bio}</p>

            {/* FOLLOW + MESSAGE (ONLY OTHER USERS) */}
            <div className="mt-4 flex gap-3">
              <FollowButton
                userId={id}
                currentUserId={currentUser?._id}
                isInitiallyFollowing={user.isFollowed}
              />

              <button
                onClick={startChat}
                className="px-4 py-1 rounded bg-gray-300"
              >
                Message
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-10 justify-center">
          <Link
            to={`/followers/${user._id}`}
            className="flex gap-1.5 text-sm text-gray-500 hover:text-indigo-600"
          >
            <p className="font-bold">{user.followersCount}</p>
            <span>Followers</span>
          </Link>

          <Link
            to={`/following/${user._id}`}
            className="flex gap-1.5 text-sm text-gray-500 hover:text-indigo-600"
          >
            <p className="font-bold">{user.followingCount}</p>
            <span>Following</span>
          </Link>
        </div>
      </div>

      {/* POSTS */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {posts.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">
            No posts yet
          </p>
        ) : (
          posts.map(post => (
            <PostCard
              key={post._id}
              post={post}
              currentUserId={currentUser?._id}
              refresh={fetchPosts}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default UserProfile;
