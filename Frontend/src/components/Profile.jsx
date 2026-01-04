import { useState, useEffect } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import MyPosts from "./MyPosts";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    toast.success("Logged Out");
  };

  const fetchProfile = () => {
    API.get("/auth/profile").then(res => setUser(res.data));
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-24 pb-10">


      {/* ================= PROFILE CARD ================= */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

          {/* LEFT : AVATAR + INFO */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src={
                user.profilePic
                  ? `http://localhost:3000/uploads/posts/${user.profilePic}`
                  : "/default-avatar.png"
              }
              alt="profile"
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-gray-300"
            />

            <div className="text-center sm:text-left">
              <h2 className="text-2xl font-semibold text-gray-800">
                {user.name}
              </h2>

              <p
                className="text-indigo-600 text-lg"
                style={{ fontFamily: "cursive" }}
              >
                @{user.username}
              </p>

              <p className="text-sm text-gray-400">
                {user.email}
              </p>

              {user.bio && (
                <p className="text-sm text-gray-500 mt-1 max-w-sm">
                  {user.bio}
                </p>
              )}

              {/* ACTION BUTTONS */}
              <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                <Link to="/updateProfile">
                  <button className="px-5 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    Edit Profile
                  </button>
                </Link>

                <Link to="/createPost">
                  <button className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition">
                    Create Post
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* RIGHT : FOLLOWERS / FOLLOWING (INLINE LIKE BEFORE) */}
          <div className="flex flex-col items-center md:items-end gap-3">

            <div className="flex gap-6 text-sm text-gray-600">
              <Link
                to={`/followers/${user._id}`}
                className="flex gap-1 hover:text-indigo-600 transition"
              >
                <span className="font-bold text-gray-800">
                  {user.followers?.length || 0}
                </span>
                <span>Followers</span>
              </Link>

              <Link
                to={`/following/${user._id}`}
                className="flex gap-1 hover:text-indigo-600 transition"
              >
                <span className="font-bold text-gray-800">
                  {user.following?.length || 0}
                </span>
                <span>Following</span>
              </Link>
            </div>

            {/* LOGOUT */}
            <button
              onClick={logout}
              className="text-sm text-red-500 hover:text-red-600 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* ================= MY POSTS ================= */}
      <div className="mt-10">
        <MyPosts />
      </div>
    </div>
  );
};

export default Profile;
