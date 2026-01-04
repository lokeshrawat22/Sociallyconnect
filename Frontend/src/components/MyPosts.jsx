import { useEffect, useState } from "react";
import API from "../api";
import PostCard from "../components/PostCard";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user"));

  const fetchMyPosts = async () => {
    const res = await API.get("/auth/posts/me");
    setPosts(res.data);
  };

  useEffect(() => {
    fetchMyPosts();
  }, []);

  return (
    <div className="mt-16 px-4">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {posts.map(post => (
          <PostCard
  key={post._id}
  post={post}
  currentUserId={currentUser._id}
  refresh={fetchMyPosts}
  hideFollow={true}  
/>

        ))}
      </div>
    </div>
  );
};

export default MyPosts;
