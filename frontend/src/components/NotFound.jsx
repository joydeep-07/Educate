import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      {/* Big 404 Heading */}
      <h1 className="text-8xl mt-25 font-extrabold text-gray-800 tracking-tight">
        404
      </h1>

      {/* Sub-heading */}
      <p className="mt-4 text-2xl font-semibold text-gray-700">
        Oops! Looks like you’re lost.
      </p>

      {/* Description */}
      <p className="mt-2 text-gray-500 text-center max-w-md">
        The page you are looking for might have been moved, deleted, or perhaps
        never existed. Don’t worry we’ll help you get back on track.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="mt-8 inline-block px-6 py-3 text-lg font-medium text-white  bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md transition"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
