// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [freshUser, setFreshUser] = useState(user);

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

 
  return (
    <div className="flex flex-col items-center justify-center pt-35 text-gray-700">
      <h1 className="text-5xl font-semibold mb-6">
        Hii, {freshUser?.firstname}
      </h1>
      <p className="text-lg mb-6">You are logged in as :  {freshUser?.email}</p>
    </div>
  );
};

export default Dashboard;
