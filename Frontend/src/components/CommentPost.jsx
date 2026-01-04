import { useEffect, useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import '../App.css'

const CommentPost = ({ postId, refresh }) => {
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);


 const fetchComments = async () => {
  try {
    const res = await API.get(`/auth/posts/${postId}/comments`);
    setComments(res.data.comments || []);
  } catch (err) {
    toast.error("Failed to load comments");
  }
};


  const addComment = async () => {
    if (!text.trim()) return toast.warning("Write something");

    try {
      await API.post(`/auth/posts/${postId}/comment`, { text });
      setText("");
      fetchComments();
      refresh(); 
    } catch (err) {
      toast.error("Could not post comment");
    }
  };

  
  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="flex flex-col h-[420px]  ">
      {/* HEADER */}
      <div className="border-b pb-2 mb-3">
        <h3 className="font-semibold text-lg text-center">
          Comments
        </h3>
      </div>

     
      <div className="flex-1 overflow-y-auto space-y-3 px-1 no-scrollbar">
        {loading && (
          <p className="text-center text-gray-400 text-sm">
            Loading comments...
          </p>
        )}

        {!loading && comments.length === 0 && (
          <p className="text-center text-gray-400 text-sm">
            No comments yet
          </p>
        )}
<div className="flex-1 overflow-y-auto space-y-3 px-1 no-scrollbar">
        {comments.map((comment, index) => (
          <div key={index} className="flex items-start gap-3 no-scrollbar">
            <img
              src={
                comment.user?.profilePic
                  ? `http://localhost:3000/uploads/posts/${comment.user.profilePic}`
                  : "/default-avatar.png"
              }
              className="w-8 h-8 rounded-full object-cover"
            />
            <div className="bg-gray-100 rounded-xl px-3 py-2">
              <p className="text-sm font-semibold">
                @{comment.user?.username}
              </p>
              <p className="text-sm text-gray-700">
                {comment.text}
              </p>
            </div>
          </div>
        ))}
      </div>
</div>


      {/* INPUT AREA */}
      <div className="border-t pt-3 mt-3 flex gap-2">
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addComment()}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-full
                     focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={addComment}
          className="bg-blue-600 text-white px-4 py-2
                     rounded-full font-semibold hover:bg-blue-700"
        >
          Post
        </button>
      </div>
    </div>
  );
};

export default CommentPost;
