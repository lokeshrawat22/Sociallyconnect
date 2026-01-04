import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submitHandler = async () => {
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await API.post("/auth/forgot-password", { email });
      toast.success("Check your email for reset link");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 px-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">

        {/* HEADER */}
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Forgot Password
        </h2>
        <p className="text-sm text-gray-500 text-center mt-1">
          Enter your email and we’ll send you a reset link
        </p>

        {/* INPUT */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg
                       focus:outline-none focus:ring-2
                       focus:ring-indigo-500"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={submitHandler}
          disabled={loading}
          className="w-full mt-6 py-2 rounded-lg
                     bg-indigo-600 text-white font-medium
                     hover:bg-indigo-700 transition
                     disabled:opacity-50"
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        {/* FOOTER */}
        <p className="text-xs text-gray-500 text-center mt-4">
          You’ll receive an email if the address exists in our system
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
