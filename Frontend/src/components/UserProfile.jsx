import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import API from "../api";
import FollowButton from "../components/FollowButton";
import PostCard from "../components/PostCard";
import DefaultProfile from '../assets/defaultprofile.webp'

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (currentUser && String(currentUser._id) === String(id)) {
      navigate("/profile", { replace: true });
    }
  }, [id, currentUser, navigate]);

  const isOwnProfile = String(currentUser?._id) === String(id);

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
    const res = await API.get(`/auth/users/${id}/userProfile`);
    setUser(res.data);
  };

  const fetchPosts = async () => {
    try {
      const res = await API.get(`/auth/posts/user/${id}`);
      setPosts(res.data || []);
    } finally {
      setLoading(false);
    }
  };

  const startChat = async () => {
    const res = await API.get(`/auth/conversation/${id}`);
    navigate(`/messages/${res.data._id}`);
  };

  if (isOwnProfile) return null;
  if (loading) return <p className="text-center mt-10 text-gray-400">Loading...</p>;
  if (!user) return <p className="text-center mt-10">User not found</p>;

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-md p-6">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

           
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={
                  user.profilePic || `${DefaultProfile}`
                   
                }
                alt="profile"
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-[#FAD4CF]"
              />

              <div className="text-center sm:text-left">
                <h2 className="text-2xl font-semibold text-gray-800">
                  {user.name}
                </h2>

                <p className="text-sm font-medium text-[#F36B5E]">
                  @{user.username}
                </p>

                {user.bio && (
                  <p className="text-sm text-gray-600 mt-1 max-w-sm">
                    {user.bio}
                  </p>
                )}

                <div className="mt-4  flex flex-wrap justify-center sm:justify-start gap-3">

                  <FollowButton
                    userId={id}
                    currentUserId={currentUser?._id}
                    isInitiallyFollowing={user.isFollowed}
                    className="px-5 py-2 rounded-full bg-[#F36B5E] text-white text-sm font-medium hover:bg-[#E85A4F]"
                  />

                  <button
                    onClick={startChat}
                    className="px-5 py-2 rounded-full border border-[#F36B5E] text-[#F36B5E] text-sm font-medium hover:bg-[#FFF1EE] transition"
                  >
                    Message
                  </button>
                </div>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <Link
                to={`/followers/${user._id}`}
                className="flex gap-1 hover:text-[#F36B5E] transition"
              >
                <span className="font-bold text-gray-800">
                  {user.followersCount}
                </span>
                <span className="text-gray-600">Followers</span>
              </Link>

              <Link
                to={`/following/${user._id}`}
                className="flex gap-1 hover:text-[#F36B5E] transition"
              >
                <span className="font-bold text-gray-800">
                  {user.followingCount}
                </span>
                <span className="text-gray-600">Following</span>
              </Link>
            </div>
          </div>
        </div>

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
    </div>
  );
};

export default UserProfile;
