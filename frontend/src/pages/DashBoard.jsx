// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user, token } = useSelector((state) => state.auth);

  const [freshUser, setFreshUser] = useState(user);

  return (
    <div className="flex flex-col items-center justify-center pt-35 text-gray-700">
      <h1 className="text-5xl font-semibold mb-6">
        Hii, {freshUser?.firstname}
      </h1>
      <p className="text-lg mb-6">You are logged in as : {freshUser?.email}</p>
    </div>
  );
};

export default Dashboard;
