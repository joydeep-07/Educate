// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [freshUser, setFreshUser] = useState(user);

  // Fetch user details from backend
  useEffect(() => {
    if (token) {
      fetch("http://localhost:3000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("Fetched user from /me:", data);
          if (data?.user) {
            setFreshUser(data.user);
          }
        })
        .catch((err) => console.error("Failed to fetch user:", err));
    }
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/register");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-700">
      <h1 className="text-4xl font-semibold mb-6">
        Welcome, {freshUser?.firstname} {freshUser?.lastname} 🎉
      </h1>
      <p className="text-lg mb-6">You are logged in as {freshUser?.email}</p>

      <button
        onClick={handleLogout}
        className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
