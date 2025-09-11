import React from "react";
import { FcGoogle } from "react-icons/fc";

const Google = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full py-3 flex items-center justify-center gap-3 bg-white rounded-full text-black font-medium hover:bg-gray-200 transition"
    >
      <FcGoogle size={22} /> Continue with Google
    </button>
  );
};

export default Google;
