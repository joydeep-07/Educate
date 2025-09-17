import React from "react";
import logo from "../assets/images/logo.png";

const About = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col lg:flex-row justify-center items-center gap-10 lg:gap-16">
          {/* Image Section */}
          <div className="flex-1 transition-all duration-500 hover:scale-105">
            <div className="relative">
              <div className="absolute -inset-4 bg-gray-100 rounded-2xl rotate-3 opacity-70"></div>
              <img
                className="relative w-full max-w-md mx-auto rounded-2xl shadow-xl z-10"
                src={logo}
                alt="Company Logo"
              />
            </div>
          </div>

          {/* Text Content Section */}
          <div className="flex-1">
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-800">
                About <span className="text-blue-600">Our Company</span>
              </h1>

              <div className="h-1 w-20 bg-blue-500 rounded-full"></div>

              <p className="text-lg text-gray-600 leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Nesciunt, praesentium. Atque quo, delectus, ullam quam odit
                natus rem animi repellat beatae enim facere harum sit
                repudiandae suscipit, deserunt eos optio nesciunt velit.
              </p>

              <p className="text-lg text-gray-600 leading-relaxed">
                Quasi, sunt, et sed maxime saepe incidunt obcaecati architecto
                laudantium consectetur odit eaque repellendus mollitia officiis
                praesentium in? Sit, unde ipsum sequi explicabo quasi debitis.
              </p>

              <div className="pt-4">
                <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow-md">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
