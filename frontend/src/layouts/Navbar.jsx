import React, { useState, useRef,useEffect } from "react";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaUpload,
  FaHeart,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [freshUser, setFreshUser] = useState(user);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
        {/* Logo Section */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="h-10 object-contain" src={logo} alt="Educate Logo" />
          <h1 className="text-[25px] font-semibold text-gray-700">Educate</h1>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6 relative">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-md font-medium text-gray-700">
            {!token ? (
              <>
                {["Home", "About", "Mission"].map((item) => (
                  <span
                    onClick={() => navigate("/")}
                    key={item}
                    className="relative cursor-pointer hover:text-blue-600 transition-colors group"
                  >
                    {item}
                    <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                ))}
              </>
            ) : (
              <>
                <span
                  onClick={() => navigate("/upload")}
                  className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  Upload Notes
                </span>
                <span
                  onClick={() => navigate("/likes")}
                  className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  Likes
                </span>
                <span
                  onClick={() => navigate("/messages")}
                  className="flex items-center gap-1 cursor-pointer hover:text-blue-600 transition-colors"
                >
                  Messages
                </span>
              </>
            )}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            {!token ? (
              <button
                onClick={() => navigate("/register")}
                className="signup-btn text-[15px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-full shadow-md hover:shadow-lg transform transition-all"
              >
                Sign Up
              </button>
            ) : (
              <div className="relative" ref={dropdownRef}>
                {/* User Icon */}
                <FaUserCircle
                  className="text-4xl text-gray-700 cursor-pointer hover:text-blue-600 transition-all duration-300 drop-shadow-sm"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />

                {/* Dropdown */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-60 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl animate-fadeIn overflow-hidden transition-all duration-300">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                      <h1 className="text-sm opacity-80">Welcome,</h1>
                      <h2 className="text-lg font-semibold tracking-wide">
                        {freshUser?.firstname || "Guest"}
                      </h2>
                    </div>

                    {/* Dropdown Links */}
                    <div className="flex flex-col py-2">
                      <button className="flex items-center gap-3 w-full px-5 py-2 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                        <FaUserCircle className="text-blue-600" /> Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-5 py-2 text-red-600 hover:bg-red-50 transition-all duration-300"
                      >
                        <FaSignOutAlt className="text-red-500" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div
            className="md:hidden text-2xl text-gray-700 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            ☰
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md border-t border-gray-200 shadow-lg animate-slideDown">
          <ul className="flex flex-col gap-4 py-4 px-6 text-gray-700 font-medium">
            {!token ? (
              <>
                <li className="hover:text-blue-600 cursor-pointer">Home</li>
                <li className="hover:text-blue-600 cursor-pointer">About</li>
                <li className="hover:text-blue-600 cursor-pointer">Mission</li>
                <button
                  onClick={() => navigate("/register")}
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                <li
                  onClick={() => navigate("/upload")}
                  className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                >
                  Upload Notes
                </li>
                <li
                  onClick={() => navigate("/likes")}
                  className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                >
                  Likes
                </li>
                <li
                  onClick={() => navigate("/messages")}
                  className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                >
                  Messages
                </li>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
                >
                  Logout
                </button>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
