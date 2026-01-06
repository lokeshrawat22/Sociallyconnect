import { useState, useEffect } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import MyPosts from "./MyPosts";
import { toast } from "react-toastify";
import DefaultProfile from '../assets/defaultprofile.webp'

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

  if (!user)
    return (
      <p className="text-center mt-10 text-gray-400 opacity-65">
        Create or login to your acc...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4">
      <div className="max-w-6xl mx-auto">

        <div className="bg-white rounded-2xl shadow-md p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <img
                src={user.profilePic || `${DefaultProfile}`}
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

                <div className="mt-4 flex flex-wrap justify-center sm:justify-start gap-3">
                  <Link to="/updateProfile">
                    <button className="px-5 py-2 rounded-full bg-[#F36B5E] text-white text-sm font-medium hover:bg-[#E85A4F] transition">
                      Edit Profile
                    </button>
                  </Link>

                  <Link to="/createPost">
                    <button className="px-5 py-2 rounded-full border border-[#F36B5E] text-[#F36B5E] text-sm font-medium hover:bg-[#FFF1EE] transition">
                      Create Post
                    </button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-6 text-sm">
                <Link
                  to={`/followers/${user._id}`}
                  className="flex gap-1 hover:text-[#F36B5E] transition"
                >
                  <span className="font-bold text-gray-800">
                    {user.followers?.length || 0}
                  </span>
                  <span className="text-gray-600">Followers</span>
                </Link>

                <Link
                  to={`/following/${user._id}`}
                  className="flex gap-1 hover:text-[#F36B5E] transition"
                >
                  <span className="font-bold text-gray-800">
                    {user.following?.length || 0}
                  </span>
                  <span className="text-gray-600">Following</span>
                </Link>
              </div>

              <button
                onClick={logout}
                className="text-sm font-medium text-[#F36B5E] hover:text-[#E85A4F]"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <MyPosts />
        </div>

      </div>
    </div>
  );
};

export default Profile;
