import { useEffect, useState } from "react";
import API from "../api";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";

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
    <div className="max-w-6xl mx-auto p-4">

      {/* SEARCH INPUT */}
      <input
        type="text"
        placeholder="Search users or posts..."
        className="w-full border px-4 py-2 rounded-lg mb-6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && <p>Searching...</p>}

      {/* USERS RESULT */}
      {users.length > 0 && (
        <div className="mb-10">
          <h3 className="font-semibold mb-3 text-lg">Users</h3>

          <div className="bg-white rounded-xl shadow divide-y">
            {users.map((u) => (
              <Link
                key={u._id}
                to={`/userprofile/${u._id}`}
                className="flex items-center gap-4 p-3 hover:bg-gray-50"
              >
                <img
                  src={
                    u.profilePic
                      ? `http://localhost:3000/uploads/posts/${u.profilePic}`
                      : "/default-avatar.png"
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

      {/* POSTS RESULT (PostCard Style) */}
      {posts.length > 0 && (
        <div>
          <h3 className="font-semibold mb-4 text-lg">Posts</h3>

          <div className="grid gap-6 
                          grid-cols-1 
                          sm:grid-cols-1                          md:grid-cols-2 
                          lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard
                key={post._id}
                post={post}
                currentUserId={currentUserId}
                refresh={() => search()}
              />
            ))}
          </div>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && query && users.length === 0 && posts.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No results found
        </p>
      )}

    </div>
  );
};

export default Search;
