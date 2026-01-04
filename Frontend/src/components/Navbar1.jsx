import { NavLink } from "react-router-dom";
import { FaHome, FaUser, FaSearch, FaEnvelope } from "react-icons/fa";

const Navbar = () => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-1 px-2 py-1 transition
     ${isActive
       ? "border-b-2 border-blue-600 text-blue-600 "
       : "text-gray-600 hover:text-blue-600"}`;

  return (
    <nav className="w-full shadow-sm top-0 mt-15  bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center h-14 bg-white">

          {/* NAV LINKS */}
          <div className="flex w-full gap-6 justify-center items-center text-sm font-medium fixed h-13 bg-white">

            <NavLink to="/feed" className={linkClass}>
              <FaHome className="text-lg " />
              <span className="hidden sm:inline">Home</span>
            </NavLink>

            <NavLink to="/profile" className={linkClass}>
              <FaUser className="text-lg" />
              <span className="hidden sm:inline">Profile</span>
            </NavLink>

            <NavLink to="/search" className={linkClass}>
              <FaSearch className="text-lg" />
              <span className="hidden sm:inline">Search</span>
            </NavLink>

            <NavLink to="/messages" className={linkClass}>
              <FaEnvelope className="text-lg" />
              <span className="hidden sm:inline">Messages</span>
            </NavLink>

          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
