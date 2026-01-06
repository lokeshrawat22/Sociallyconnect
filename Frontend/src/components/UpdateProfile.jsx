import { useState, useEffect } from "react";
import API from "../api";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
const UpdateProfile = ({ user, onUpdated, onClose }) => {
  const [form, setForm] = useState({ username: "", name: "" , bio: ""});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username || "",
        name: user.name || "",
        bio: user.bio || ""

      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("username", form.username);
      data.append("name", form.name);
      data.append("bio", form.bio)
      if (file) data.append("profilePic", file);

      await API.put("/auth/profile", data);
      navigate('/profile')
      toast.success("Profile Updated")


      onUpdated();
      onClose && onClose();
    } catch (err) {
      toast.err("Update Failed")
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-md p-6 mt-10 max-w-xl mx-auto space-y-4 "
    >
      <h3 className="text-xl font-semibold text-center">Update Profile</h3>

      <input
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        value={form.username}
        placeholder="Username"
        onChange={(e) =>
          setForm({ ...form, username: e.target.value })
        }
        required
      />

      <input
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        value={form.name}
        placeholder="Name"
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
        required
      />
      <input
        className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
        value={form.bio}
        placeholder="Share your thoughts"
        onChange={(e) =>
          setForm({ ...form, bio: e.target.value })
        }
        required
      />
 <label className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">
          <span className="text-gray-500 text-sm">
            Click to upload Profile Pic
          </span>
         <input
        type="file"
        className="w-full hidden"
        onChange={(e) => setFile(e.target.files[0])}
      />
        </label>
      

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default UpdateProfile;
