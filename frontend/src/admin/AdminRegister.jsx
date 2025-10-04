import React, { useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Lottie from "lottie-react";
import animation from "../assets/animation/Analytics.json";
import { toast } from "sonner";

const AdminRegister = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/admin/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(data.message);
        setFirstName("");
        setLastName("");
        setEmail("");
        navigate("/courses"); // optional redirect
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };


  return (
    <div className="flex items-center justify-center py-10 mt-10 font-sans">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden h-[600px]">
        {/* Left Side - Banner */}
        <div className="w-2/3 relative flex flex-col justify-between py-12 px-12 overflow-hidden">
          <div className="flex flex-1 items-center justify-center">
            <Lottie
              animationData={animation}
              loop
              autoplay
              className="w-80 h-80"
            />
          </div>
          <div className="z-10 px-2 pb-4">
            <h2 className="text-3xl font-semibold text-white mb-4 leading-tight">
              <span className="text-gray-700">Admin</span> Registration
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">
              Register a new admin account to access the medical administration
              portal securely.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-12 bg-white flex flex-col justify-center relative">
          <div className="z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Admin Register
            </h2>
            <p className="text-gray-500 text-sm mb-8">
              Enter your details to create an admin account
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border-b border-gray-300 outline-none"
                    required
                    placeholder="Enter your first name"
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border-b border-gray-300 outline-none"
                    required
                    placeholder="Enter your last name"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 border-b border-gray-300 outline-none"
                    required
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-transform transform hover:scale-[1.02] shadow-md"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
