import { useEffect, useState } from "react";
import API from "../api";

const Posts = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    API.get("/auth/posts")
      .then(res => setPosts(res.data))
      .catch(err => {
        console.error(err);
        setPosts([]);
      });
  }, []);

  if (!posts) return <p>Loading posts...</p>;

  if (posts.length === 0) return <p>No posts yet.</p>;

  return (
    <div>
      <h2>Posts</h2>

      {posts.map(post => (
        <div key={post._id} style={{ marginBottom: "20px" }}>
          <h4>{post.title || "Untitled Post"}</h4>

          <p>
            <strong>
              {post.user?.username || "Unknown user"}
            </strong>
          </p>

          <p>{post.description}</p>

          {post.media && (
            post.mediaType === "image" ? (
              <img
                src={`http://localhost:3000/uploads/posts/${post.media}`}
                width="250"
                alt="post"
              />
            ) : (
              <video
                src={`http://localhost:3000/uploads/posts/${post.media}`}
                controls
                width="250"
              />
            )
          )}
        </div>
      ))}
    </div>
  );
};

export default Posts;
