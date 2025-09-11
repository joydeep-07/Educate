import React from "react";
import Navbar from "../layouts/Navbar";
import logo from "../assets/images/logo.png";
import Testimonials from "../components/Testimonials";

const Home = () => {
  return (
    <>
      <div className="flex flex-col mt-20 mb-10 justify-center items-center px-6">
        <div className="wrapper max-w-8xl w-full flex flex-col md:flex-row items-center justify-between py-10">
          {/* Left Text Section */}
          <div className="text md:w-1/2 pl-10">
            <h1 className="uppercase text-lg font-medium text-amber-500 tracking-widest pl-1">
              Let's do Something
            </h1>
            <h1 className="text-6xl md:text-6xl font-semibold text-gray-700">
              To Revolutionize <br /> The Education System
            </h1>
            <p className="max-w-lg pt-5 text-gray-600 leading-relaxed">
              We strive towards a simple but ambitious mission: to reform the
              education system by offering world-class learning rooted in
              experience and real-life application at a fraction of the cost of
              traditional academic institutions.
            </p>

            {/* Buttons */}
            <div className="pt-6 flex gap-4">
              <button className="px-6 py-2 rounded-full bg-blue-500 text-white font-medium shadow-md hover:shadow-lg transition-all">
                Join Now
              </button>
              <button className="px-6 py-2 rounded-full border-2 border-gray-300 hover:border-blue-500 hover:text-blue-500 font-medium transition-all">
                Explore
              </button>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="image flex justify-center mt-8 md:mt-0">
            <img
              src={logo}
              alt="Educate Logo"
              className="w-72 md:w-150 drop-shadow-lg"
            />
          </div>
        </div>
        {/* Testimonials Section */}
        {/* <Testimonials/> */}
      </div>
    </>
  );
};

export default Home;
