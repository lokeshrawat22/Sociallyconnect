import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoIosHome } from "react-icons/io";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="w-full bg-white border-b border-gray-200 fixed top-0 z-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center">
                🌐
              </div>
              <span className="text-lg font-semibold text-gray-800">
                Socially<span className="text-blue-600">Connect</span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <NavLink to="/feed" label="Home" />
              <NavLink to="/privacypolicy" label="Privacy Policy" />
              <NavLink to="/about" label="About" />
              <NavLink to="/contact" label="Contact" />
              <NavLink to="/login" label="Login" />
            </div>

            {/* Mobile Toggle */}
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

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/40 z-40"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-70  bg-white z-50 transform transition-transform duration-300 ease-in-out
        ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 space-y-6 ">
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
          <MobileLink to="/login" label="Login" close={setOpen} />
        </div>
      
      </div>
    </>
  );
};

/* Reusable Components */
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
