// src/components/Register.jsx
import React, { useState } from "react";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Register = ({ switchToLogin }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.message || "Registration failed");
        return;
      }

      toast.success("Registration successful");

      setFormData({
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error("Network error. Try again later");
    }
  };

  return (
    <div className="bg-transparent flex flex-col">
      <div className="text-center mb-6">
        <h2 className="text-4xl text-gra-700 tracking-wider font-semibold mt-2 mb-5">
          Create an Account
        </h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="flex gap-2 mb-4">
          <div className="relative w-1/2">
            <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="First name"
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-400 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
            />
          </div>
          <div className="relative w-1/2">
            <FiUser className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="Last name"
              required
              className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-400 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
            />
          </div>
        </div>

        <div className="relative mb-4">
          <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email address"
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-400 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
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
            className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-400 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
          />
        </div>

        <div className="relative mb-4">
          <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
            className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 placeholder-gray-400 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition"
        >
          Next
        </button>
      </form>

      <div className="flex items-center my-4">
        <hr className="flex-grow border-gray-300" />
        <span className="text-gray-500 px-2 text-sm">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      <div className="flex justify-between items-center text-gray-600 text-sm mt-3">
        <span>
          Already have an account?{" "}
          <button
            onClick={switchToLogin}
            className="text-blue-600 font-medium hover:underline ml-2"
          >
            Sign in instead
          </button>
        </span>
        <Link to="#" className="hover:underline text-blue-600">
          Terms & Conditions
        </Link>
      </div>
    </div>
  );
};

export default Register;
