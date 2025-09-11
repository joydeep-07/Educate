import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, token } = useSelector((state) => state.auth); // ✅ check auth state

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-lg border-b border-gray-200 shadow-sm">
      <div className="max-w-8xl mx-auto px-6 md:px-12 flex justify-between items-center h-16">
        {/* Logo Section (always left) */}
        <div
          className="flex items-center gap-1 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img className="h-10 object-contain" src={logo} alt="Educate Logo" />
          <h1 className="text-[25px] font-semibold text-gray-700">Educate</h1>
        </div>

        {/* Right side (Links + Button + Mobile Menu) */}
        <div className="flex items-center gap-6">
          {/* Desktop Links */}
          <div className="hidden md:flex gap-8 text-md font-medium text-gray-700">
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
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            {token ? (
              <button
                onClick={handleLogout}
                className="text-[15px] bg-red-500 text-white px-4 py-1 rounded-full shadow-md hover:shadow-lg transform transition-all"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="signup-btn text-[15px] bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-1 rounded-full shadow-md hover:shadow-lg transform transition-all"
              >
                Sign Up
              </button>
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
            <li className="hover:text-blue-600 transition-colors cursor-pointer">
              Home
            </li>
            <li className="hover:text-blue-600 transition-colors cursor-pointer">
              About
            </li>
            <li className="hover:text-blue-600 transition-colors cursor-pointer">
              Contact
            </li>
            {token ? (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Sign Up
              </button>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
