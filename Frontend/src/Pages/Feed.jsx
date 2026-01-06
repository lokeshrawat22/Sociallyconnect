import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";

const Feed = () => {
  const [posts, setPosts] = useState([]);

  const token = localStorage.getItem("token");
  const currentUserId = (() => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id || payload._id;
    } catch {
      return null;
    }
  })();

  const fetchPosts = async () => {
    const res = await API.get("/auth/posts");
    setPosts(res.data.reverse());
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-8 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-10 justify-items-center mx-10">
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            currentUserId={currentUserId}
            refresh={fetchPosts}
          />
        ))}
      </div>
    </div>
  );
};

export default Feed;
