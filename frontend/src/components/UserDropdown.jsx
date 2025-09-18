// src/components/UserDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

import {
  CiCirclePlus,
  CiHeart,
  CiPaperplane,
  CiUser,
  CiPower,
  CiSettings,
} from "react-icons/ci";

const UserDropdown = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  const links = [
    { name: "Home", icon: <CiCirclePlus />, path: "/dashboard" },
    { name: "Upload Notes", icon: <CiCirclePlus />, path: "/upload" },
    { name: "Notifications", icon: <CiHeart />, path: "/notifications" },
    { name: "Messages", icon: <CiPaperplane />, path: "/messages" },
    { name: "Profile", icon: <CiUser />, path: "/profile" },
    // { name: "Settings", icon: <CiSettings />, path: "/settings" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        className="flex items-center gap-2 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-label="User menu"
      >
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 overflow-hidden">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt={user.firstname}
              className="w-full h-full object-cover"
            />
          ) : (
            <FaUserCircle className="text-lg" />
          )}
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {user?.firstname || "Guest"}
        </span>
        <IoIosArrowDown
          className={`text-gray-500 transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-72 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 z-50 ${
          dropdownOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Profile Header */}
        <div className="px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl overflow-hidden">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.firstname}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUserCircle />
              )}
            </div>
            <div className="overflow-hidden">
              <h2 className="font-semibold text-gray-900 truncate">
                {user?.firstname || "Guest"} {user?.lastname || ""}
              </h2>
              <p className="text-xs text-gray-500 truncate">
                {user?.email || "—"}
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="py-2">
          <ul className="space-y-1">
            {links.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(link.path)}
                  className="flex items-center gap-3 w-full px-6 py-3 text-gray-700 hover:bg-gray-50 transition-colors duration-150 text-left"
                >
                  <span className="text-xl text-gray-500">{link.icon}</span>
                  <span className="text-sm font-medium">{link.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-100 my-2"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-6 py-3 text-red-600 hover:bg-red-50 transition-colors duration-150"
          >
            <CiPower className="text-lg" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserDropdown;
