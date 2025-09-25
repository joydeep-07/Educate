// src/components/AdminDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { CiCirclePlus, CiMail, CiPower } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutAdmin } from "../redux/slices/adminSlice";
import { FaUserCircle } from "react-icons/fa";

const AdminDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminInfo = {
    name: "Admin Panel",
    email: "admin@gmail.com",
  };

  // Close dropdown on outside click
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
    dispatch(logoutAdmin());
    navigate("/admin/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
    setDropdownOpen(false);
  };

  // Links for admin dropdown
  const links = [
    { name: "Add Course", icon: <CiCirclePlus />, path: "/admin/addcourse" },
    { name: "Send Newsletter", icon: <CiMail />, path: "/admin/newsletter" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        className="flex items-center gap-2 p-1.5 rounded-full bg-blue-50 hover:bg-indigo-50 transition-colors duration-200"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        aria-label="Admin menu"
      >
        <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-base">
          <FaUserCircle />
        </div>
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {adminInfo.name}
        </span>
        <IoIosArrowDown
          className={`text-gray-500 transition-transform duration-200 ${
            dropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      <div
        className={`absolute right-0 mt-2 w-64 bg-white border border-gray-100 rounded-lg shadow-md overflow-hidden transition-all duration-300 z-50 ${
          dropdownOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        {/* Profile Header */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-xl">
              <FaUserCircle />
            </div>
            <div className="overflow-hidden">
              <h2 className="font-semibold text-gray-900 text-sm truncate">
                {adminInfo.name}
              </h2>
              <p className="text-xs text-gray-500 truncate">
                {adminInfo.email}
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="py-1.5">
          <ul className="space-y-0.5">
            {links.map((link, index) => (
              <li key={index}>
                <button
                  onClick={() => handleNavigation(link.path)}
                  className="flex items-center gap-2.5 w-full px-4 py-2.5 text-gray-700 hover:bg-gray-50 transition-colors duration-150 text-left"
                >
                  <span className="text-lg text-gray-500">{link.icon}</span>
                  <span className="text-xs font-medium">{link.name}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="border-t border-gray-100 my-1"></div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2.5 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 transition-colors duration-150 text-xs font-medium"
          >
            <CiPower className="text-base" />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDropdown;
