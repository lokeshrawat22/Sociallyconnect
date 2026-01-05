import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import Searching from '../assets/Navlogo.png'
import DefaultProfile from '../assets/defaultprofile.webp'

const Search = ({ currentUserId }) => {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setPosts([]);
      return;
    }

    const delay = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(delay);
  }, [query]);

  const search = async () => {
    try {
      setLoading(true);
      const res = await API.get(`/auth/search?q=${query}`);
      setUsers(res.data.users);
      setPosts(res.data.posts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4 min-h-[70vh]">

      
      <input
        type="text"
        placeholder="Search users or posts..."
        className="w-full border px-4 py-2 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-[#FF6B5E]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {!query && !loading && (
        <div className="flex flex-col items-center justify-center text-center  animate-fadeIn">
          
          <img
            src={Searching} 
            alt="SociallyConnect"
            className="w-64 opacity-90 mb-6"
          />

          <h2 className="text-2xl font-semibold text-gray-800 mb-2 animate-slideUp">
            Find people. Share moments.
          </h2>

          <p className="text-gray-500 text-sm animate-slideUp delay-100">
            Stay connected with your loved ones on SociallyConnect 💛
          </p>
        </div>
      )}

      {loading && <p className="text-gray-500">Searching...</p>}

   
      {users.length > 0 && (
        <div className="mb-10">
          <h3 className="font-semibold mb-3 text-lg">Users</h3>

          <div className="bg-white rounded-xl shadow divide-y">
            {users.map((u) => (
              <Link
                key={u._id}
                to={`/userprofile/${u._id}`}
                className="flex items-center gap-4 p-3 hover:bg-gray-50 transition"
              >
                <img
                  src={
                    u.profilePic
                      || `${DefaultProfile}`
                  }
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">@{u.username}</p>
                  <p className="text-sm text-gray-500">{u.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      
      {posts.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4 text-lg">Posts</h3>

          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                currentUserId={currentUserId}
                refresh={search}
              />
            ))}
          </div>
        </div>
      )}

      {!loading && query && users.length === 0 && posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No results found
        </p>
      )}
    </div>
  );
};

export default Search;
