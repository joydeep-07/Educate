import React from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo1.png";

const Footer = () => {
  return (
    <section id="contact">
      <footer className="bg-gray-50 text-gray-700 pt-16 pb-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 cursor-pointer pb-5">
              <img
                className="h-12 object-contain"
                src={logo}
                alt="Educate Logo"
              />
              <h1 className="text-2xl font-semibold text-gray-800">DEVOPS</h1>
            </div>
            <p className="text-sm text-gray-600">
              MERN Stack Developer crafting modern, scalable web applications.
            </p>
          </div>

          {/* Skills */}
          <div>
            <h4 className="text-blue-600 font-semibold mb-4 tracking-wide">
              SKILLS
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                "JavaScript / TypeScript",
                "Redux Toolkit",
                "Node.js / Express",
                "MongoDB / MySQL",
                "Tailwind CSS",
              ].map((skill) => (
                <li
                  key={skill}
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-blue-600 font-semibold mb-4 tracking-wide">
              CONTACT
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <span className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  joydeeprnp8821@gmail.com
                </span>
              </li>
              <li>
                Phone:{" "}
                <span className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  9635172639
                </span>
              </li>
              <li>
                Location:{" "}
                <span className="text-gray-700 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                  Asansol, India
                </span>
              </li>
            </ul>
          </div>

          {/* Socials */}
          <div>
            <div>
              <h4 className="text-blue-600 font-semibold mb-4 tracking-wide">
                SOCIALS
              </h4>
              <div className="flex space-x-4 text-xl text-gray-600">
                <a
                  href="https://github.com/joydeep-07"
                  target="_blank"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://www.linkedin.com/in/joydeep-paul-06b37926a"
                  target="_blank"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  <FaLinkedin />
                </a>
                <a
                  href="https://www.facebook.com/joydeep.paul.568089"
                  target="_blank"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/mr.paul_16"
                  target="_blank"
                  className="hover:text-blue-600 transition-colors duration-300"
                >
                  <FaInstagram />
                </a>
              </div>
            </div>

            <Link
              to="/admin/panel"
              className="inline-block mt-5 px-4 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded-full shadow-lg "
            >
              Admin Panel
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          © {new Date().getFullYear()} Joydeep Paul. All rights reserved.
        </div>
      </footer>
    </section>
  );
};

export default Footer;
