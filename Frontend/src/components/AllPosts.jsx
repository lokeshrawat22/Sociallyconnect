import { useEffect, useState } from "react";
import API from "../api";
import FollowButton from "../components/FollowButton";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get logged-in user
  useEffect(() => {
    API.get("/auth/profile")
      .then(res => setCurrentUserId(res.data._id))
      .catch(err => console.error(err));
  }, []);

  // Get all posts
  useEffect(() => {
    API.get("/auth/posts")
      .then(res => setPosts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Feed</h2>

      {posts.map(post => (
        <div key={post._id} style={{ borderBottom: "1px solid #ccc", marginBottom: 20 }}>
          <h4>{post.title}</h4>

          <p>
            {post.user
              ? `${post.user.name} (@${post.user.username})`
              : "Unknown user"}
          </p>

          {/* ✅ Follow button (only for other users) */}
          {post.user && post.user._id !== currentUserId && (
            <FollowButton userId={post.user._id} />
          )}

          {post.mediaType === "image" ? (
            <img
              src={`http://localhost:3000/uploads/posts/${post.media}`}
              width="250"
              alt=""
            />
          ) : (
            <video
              src={`http://localhost:3000/uploads/posts/${post.media}`}
              width="250"
              controls
            />
          )}

          <p>{post.description}</p>
        </div>
      ))}
    </div>
  );
};

export default AllPosts;
