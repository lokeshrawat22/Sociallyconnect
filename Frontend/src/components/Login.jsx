import React, { useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { FaLock, FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await API.post("/auth/login", { email, password });

    // 🔥 STORE TOKEN + USER
    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    setEmail("");
    setPassword("");

    toast.success("Login Successfully!");
    navigate("/feed");
  } catch (err) {
    toast.error(err.response?.data?.error || "Login failed");
  }
};

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md  ">
      <h2 className="text-2xl font-bold mb-8 text-center">LOG IN</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email */}
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-3 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Password */}
        <div className="relative">
          <FaLock className="absolute left-3 top-3 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="pl-10 w-full border border-gray-300 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Remember me and forgot */}
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
              className="w-4 h-4 rounded border-gray-300"
            />
            Remember me
          </label>
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        >
          LOG IN
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
};

export default Login;
