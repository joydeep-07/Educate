import React from "react";
import Lottie from "lottie-react";
import loading from "../assets/animation/Loading.json";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-48 h-48">
        <Lottie animationData={loading} loop autoplay />
      </div>
      <p className="mt-6 text-gray-600 font-medium text-lg animate-pulse">
        Loading, please wait...
      </p>
    </div>
  );
};

export default Loader;
