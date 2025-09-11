// src/components/Login.jsx
import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

const Login = ({ switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  return (
    <div className="bg-transparent flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-4xl text-gray-900 font-semibold mt-2 mb-5">
          <span className="text-blue-500">L</span>
          <span className="text-red-500">O</span>
          <span className="text-yellow-500">G</span>
          <span className="text-blue-500">I</span>
          <span className="text-green-500">N</span>
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="relative mb-4">
          <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email or phone"
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-full outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="relative mb-4">
          <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-100 border-2 border-gray-300 rounded-full outline-none focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition"
        >
          Next
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-500 px-2 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google button */}
      <button className="w-full py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-full hover:bg-gray-100 transition flex items-center justify-center">
        <img
          src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
          alt="Google logo"
          className="h-6 w-auto mr-2"
        />
        Sign in with Google
      </button>

      <div className="flex justify-between items-center text-gray-600 text-sm mt-3">
        <span>
          Don’t have an account?{" "}
          <button
            onClick={switchToRegister}
            className="text-blue-600 font-medium hover:underline ml-2"
          >
            Create account
          </button>
        </span>
        <Link to="/forgot/password" className="text-blue-600 hover:underline">
          Forgot password?
        </Link>
      </div>
    </div>
  );
};

export default Login;
