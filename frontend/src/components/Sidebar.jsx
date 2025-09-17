// src/components/Sidebar.jsx
import React from "react";
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
    <div
      className="
        group
        w-[60px] hover:w-[220px] 
        mt-16 h-screen hidden md:flex flex-col p-4 
        transition-all duration-300 ease-in-out
        bg-gradient-to-b from-indigo-700 via-purple-700 to-indigo-900
        shadow-xl rounded-2xl
      "
    >
      <h2
        className="
          text-xl font-bold text-white mb-6 
          opacity-0 group-hover:opacity-100 
          transition-opacity duration-300
        "
      >
        Dashboard
      </h2>

      <ul className="space-y-4">
        {links.map((link, index) => (
          <li
            key={index}
            onClick={() => navigate(link.path)}
            className="
              flex items-center gap-3 text-gray-200 cursor-pointer
              hover:text-yellow-400 hover:translate-x-1
              transition-all duration-300
            "
          >
            <span className="text-2xl">{link.icon}</span>
            <span
              className="
                text-md font-medium 
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
              "
            >
              {link.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
