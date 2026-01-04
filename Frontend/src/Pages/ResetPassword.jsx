import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await API.put(`/auth/reset-password/${token}`, { password });
      toast.success("Password reset successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid or expired link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Reset Password
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Create a new password for your account
        </p>

        {/* FORM */}
        <form onSubmit={submitHandler} className="mt-6 space-y-4">

          {/* NEW PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              New Password
            </label>
            <input
              type="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg
                         focus:outline-none focus:ring-2
                         focus:ring-indigo-500"
              required
            />
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg
                         focus:outline-none focus:ring-2
                         focus:ring-indigo-500"
              required
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg
                       bg-indigo-600 text-white font-medium
                       hover:bg-indigo-700 transition
                       disabled:opacity-50"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-4">
          Make sure your password is strong and secure
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;
