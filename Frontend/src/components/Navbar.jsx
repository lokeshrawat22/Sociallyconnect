import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navlogo from "../assets/navlogo1.jpeg";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");


  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

           
            <div className="flex items-center space-x-2">
              <div className="w-13 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                <img src={Navlogo} alt="" />
              </div>

              <span className="text-lg font-semibold text-blue-950">
                Socially<span className="text-cyan-500">Connect</span>
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/feed" label="Home" />
              <NavLink to="/privacypolicy" label="Privacy Policy" />
              <NavLink to="/about" label="About" />
              <NavLink to="/contact" label="Contact" />

              {!isLoggedIn ? (
                <NavLink to="/login" label="Login" />
              ) : (
                <button
                  onClick={handleLogout}
                  className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
                >
                  Logout
                </button>
              )}
            </div>

           
            <button
              onClick={() => setOpen(true)}
              className="md:hidden text-gray-600"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-70 bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 space-y-6">
          <button
            onClick={() => setOpen(false)}
            className="text-gray-500 text-sm mb-20"
          >
            ✕ Close
          </button>

          <MobileLink to="/feed" label="Home" close={setOpen} />
          <MobileLink to="/privacypolicy" label="Privacy Policy" close={setOpen} />
          <MobileLink to="/about" label="About" close={setOpen} />
          <MobileLink to="/contact" label="Contact" close={setOpen} />

          {!isLoggedIn ? (
            <MobileLink to="/login" label="Login" close={setOpen} />
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="block text-lg font-medium text-gray-700 hover:text-blue-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};



const NavLink = ({ to, label }) => (
  <Link
    to={to}
    className="text-sm font-medium text-gray-600 hover:text-blue-600 transition"
  >
    {label}
  </Link>
);

const MobileLink = ({ to, label, close }) => (
  <Link
    to={to}
    onClick={() => close(false)}
    className="block text-lg font-medium text-gray-700 hover:text-blue-600"
  >
    {label}
  </Link>
);

export default Navbar;
