import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";
import { BsThreeDotsVertical } from "react-icons/bs";


const DeletePost = ({ postId, onDelete }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await API.delete(`/auth/posts/${postId}`);
      toast.success("Post deleted");
      setOpen(false);
      onDelete && onDelete(); 
    } catch {
      toast.error("Failed to delete post");
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-gray-500 text-lg"
      >
        <BsThreeDotsVertical />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg text-sm z-10">
          <button
            onClick={handleDelete}
            className="block px-4 py-2 text-red-500 hover:bg-red-50 w-full text-left"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default DeletePost;
