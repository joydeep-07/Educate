// src/components/DashBoard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogout = async () => {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const response = await fetch("http://localhost:3000/api/auth/logout/", {
        method: "POST", // usually logout is POST
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // send token if required by backend
        },
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Logout failed!");
      } else {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/register"); // redirect to login page
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center pt-35">
      <h1 className="text-5xl text-gray-700 mb-8">You are Logged in</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <button
        onClick={handleLogout}
        disabled={loading}
        className="px-6 py-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition disabled:opacity-50"
      >
        {loading ? "Logging out..." : "Logout"}
      </button>
    </div>
  );
};

export default DashBoard;
