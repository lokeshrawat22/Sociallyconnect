import { useState } from "react";
import API from "../api";
import { toast } from "react-toastify";

const CreatePost = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an image or video");

    setLoading(true);
    try {
      const data = new FormData();
      data.append("title", form.title);
      data.append("description", form.description);
      data.append("media", file);

      await API.post("/auth/posts", data);
      toast.success("Post uploaded");

      setForm({ title: "", description: "" });
      setFile(null);
      setPreview(null);
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);

    if (selected) {
      setPreview(URL.createObjectURL(selected));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg space-y-4"
      >
        <h3 className="text-2xl font-semibold text-center">
          Create Post
        </h3>

        {/* Title */}
        <input
          value={form.title}
          placeholder="Post title"
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500"
          required
        />

        {/* Description */}
        <textarea
          value={form.description}
          placeholder="Write something..."
          onChange={(e) =>
            setForm({ ...form, description: e.target.value })
          }
          className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 resize-none"
          rows={3}
          required
        />

        {/* Media Upload */}
        <label className="border-2 border-dashed rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">
          <span className="text-gray-500 text-sm">
            Click to upload image or video
          </span>
          <input
            type="file"
            accept="image/*,video/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {/* Preview */}
        {preview && (
          <div className="rounded-xl overflow-hidden">
            {file?.type.startsWith("image") ? (
              <img
                src={preview}
                className="w-full h-52 object-cover"
              />
            ) : (
              <video
                src={preview}
                controls
                className="w-full h-52 object-cover"
              />
            )}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-60"
        >
          {loading ? "Uploading..." : "Upload Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
