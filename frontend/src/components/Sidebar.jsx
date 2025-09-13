// src/components/Sidebar.jsx
import React from "react";
import { FaUpload, FaBell, FaEnvelope, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiCirclePlus, CiHeart, CiPaperplane, CiUser } from "react-icons/ci";
const Sidebar = () => {
  const navigate = useNavigate();

  const links = [
    { name: "Upload Notes", icon: <CiCirclePlus />, path: "/upload" },
    { name: "Notifications", icon: <CiHeart />, path: "/notifications" },
    { name: "Messages", icon: <CiPaperplane />, path: "/messages" },
    { name: "Profile", icon: <CiUser />, path: "/profile" },
  ];

  return (
    <div className="w-[200px] border-r border-gray-200 mt-16 backdrop-blur-md h-screen hidden md:flex flex-col p-4">
      <h2 className="text-xl font-bold text-gray-700 mb-6">Dashboard</h2>
      <ul className="space-y-4">
        {links.map((link, index) => (
          <li
            key={index}
            onClick={() => navigate(link.path)}
            className="flex items-center gap-3 text-gray-700 cursor-pointer hover:text-blue-600 hover:translate-x-1 transition-all duration-300"
          >
            <span className="text-xl font-semibold">{link.icon}</span>
            <span className="text-md font-medium">{link.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
