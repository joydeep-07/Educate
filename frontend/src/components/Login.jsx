// src/components/Login.jsx
import React, { useState } from "react";
import { FiUser, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/slices/authSlice";

const Login = ({ switchToRegister }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/auth/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed!");
      } else {
        // Save to Redux + localStorage
        dispatch(loginSuccess({ user: data.user, token: data.token }));
        navigate("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-transparent flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-4xl text-gray-700 tracking-wider font-semibold mt-2 mb-5">
          Login
        </h2>
      </div>

      {error && (
        <div className="text-red-500 text-sm mb-4 text-center">{error}</div>
      )}

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
          disabled={loading}
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Next"}
        </button>
      </form>

      {/* Divider */}
      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-500 px-2 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google button */}
      <button
        type="button"
        className="w-full py-3 bg-white text-gray-700 border border-gray-300 font-medium rounded-full hover:bg-gray-100 transition flex items-center justify-center"
      >
        <FcGoogle className="text-2xl mr-2" /> Sign in with Google
      </button>

      <div className="flex justify-between items-center text-gray-600 text-sm mt-3">
        <span>
          Don’t have an account?{" "}
          <button
            type="button"
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
