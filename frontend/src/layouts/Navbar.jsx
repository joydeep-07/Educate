// src/layouts/Navbar.jsx
import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import UserDropdown from "../components/UserDropdown";

const Navbar = () => {
  const { user, token } = useSelector((state) => state.auth);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  // Define logged-in navigation links
  const loggedInLinks = [
    { name: "All Courses", path: "/courses" }, 
    { name: "Quiz", path: "/quiz" }, 
  ];

  // Define logged-out navigation links
  const loggedOutLinks = [
    { name: "Home", path: "/" },
    { name: "All Courses", path: "/courses" },
    { name: "About", path: "/about" }, 
  ];

  // Helper component for a single Nav Link
  const NavLink = ({ item, onClick }) => (
    <span
      onClick={onClick}
      key={item.name}
      className="relative cursor-pointer hover:text-blue-600 transition-colors group"
    >
      {item.name}
      <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-300 group-hover:w-full"></span>
    </span>
  );

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
        {/* Logo */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="h-10 object-contain" src={logo} alt="Educate Logo" />
          <h1 className="text-[25px] font-semibold text-gray-700">Educate</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-1 mx-6 hidden md:flex">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const query = e.target.search.value.trim();
              console.log(query);
            }}
            className="flex items-center w-[600px] relative"
          >
            <input
              id="search"
              name="search"
              type="text"
              placeholder="Search notes, users..."
              className="w-full px-4 py-[9px] pr-10 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-400 focus:outline-none text-sm"
            />
            <button
              type="submit"
              className="absolute right-3 text-gray-500 hover:text-blue-600 transition-colors"
            >
              <FaSearch size={16} />
            </button>
          </form>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-6 relative">
          {/* Desktop Links (Conditional) */}
          <div className="hidden md:flex gap-8 text-md font-medium text-gray-700">
            {token // Check if user is logged in
              ? loggedInLinks.map((item) => (
                  <NavLink
                    key={item.name}
                    item={item}
                    onClick={() => navigate(item.path)}
                  />
                ))
              : loggedOutLinks.map((item) => (
                  <NavLink
                    key={item.name}
                    item={item}
                    onClick={() => navigate(item.path)}
                  />
                ))}
          </div>

          {/* CTA / UserDropdown */}
          <div className="hidden md:block">
            {!token ? (
              <button
                onClick={() => navigate("/register")}
                className="signup-btn text-[15px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-full shadow-md hover:shadow-lg transform transition-all"
              >
                Sign Up
              </button>
            ) : (
              <UserDropdown user={user} />
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
    </nav>
  );
};

export default Navbar;
