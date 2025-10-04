import React, { useState, useEffect } from "react";
import { FaEnvelope, FaExclamationCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginAdmin } from "../redux/slices/adminSlice";
import { logout } from "../redux/slices/authSlice";
import Lottie from "lottie-react";
import { toast } from "sonner";
import Heartrate from "../assets/animation/Analytics.json";
import { ENDPOINTS } from "../utils/endpoints";
import { PiSpinnerBold } from "react-icons/pi";
import AOS from "aos";
import "aos/dist/aos.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [adminId, setAdminId] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    AOS.init({ duration: 600, once: true }); // 600ms fade-up, runs once
  }, []);

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(ENDPOINTS.CHECK_EMAIL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setAdminId(data.adminId);
        setStep(2);
        toast.success("OTP sent to your email!");
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(ENDPOINTS.VERIFY_OTP, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ adminId, otp }),
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(logout());
        dispatch(loginAdmin({ email: data.admin.email, role: "admin" }));
        navigate("/courses");
        setError("");
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error");
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center py-10 mt-10 font-sans">
      <div className="w-full max-w-6xl flex bg-white rounded-2xl shadow-2xl overflow-hidden h-[600px] transition-all duration-300 hover:shadow-2xl">
        {/* Left Side - Banner */}
        <div className="w-2/3 bg-white relative flex flex-col justify-between py-12 px-12 overflow-hidden">
          <div className="flex flex-1 items-center justify-center">
            <Lottie
              animationData={Heartrate}
              loop
              autoplay
              className="w-80 h-80 transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="z-10 px-2 pb-4 transform transition-all duration-300 hover:translate-x-1">
            <h2 className="text-3xl font-semibold text-white mb-4 leading-tight">
              <span className="text-blue-600 transition-colors duration-300 hover:text-blue-700">
                Secure
              </span>{" "}
              Medical
              <br />
              <span className="text-blue-500 transition-colors duration-300 hover:text-blue-600">
                Administration
              </span>{" "}
              Portal
            </h2>
            <p className="text-blue-400 text-opacity-90 text-base leading-relaxed transition-all duration-300 hover:text-opacity-100">
              Manage courses, track student progress, and oversee learning
              materials with our secure platform designed for educators and
              institutions.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-12 bg-white flex flex-col justify-center relative">
          <div className="z-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2 transition-all duration-300 hover:tracking-tight">
              Admin Login
            </h2>
            <p className="text-gray-500 text-sm mb-8 transition-colors duration-300 hover:text-gray-600">
              {step === 1
                ? "Enter your email to start login"
                : "Enter the OTP sent to your email"}
            </p>

            <form
              onSubmit={step === 1 ? handleEmailSubmit : handleOtpSubmit}
              className="space-y-6"
            >
              {/* Error */}
              {error && (
                <div
                  className="flex items-center p-3 bg-red-50 text-red-600 rounded-lg text-sm transition-all duration-300 animate-pulse"
                  data-aos="fade-up"
                >
                  <FaExclamationCircle className="mr-2 flex-shrink-0 animate-bounce" />
                  {error}
                </div>
              )}

              {/* Email */}
              {step === 1 && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-gray-900">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300">
                      <FaEnvelope
                        className={`${
                          inputFocus
                            ? "text-blue-500 scale-110"
                            : "text-gray-400"
                        } transition-all duration-300`}
                      />
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onFocus={() => setInputFocus(true)}
                      onBlur={() => setInputFocus(false)}
                      className="w-full pl-10 pr-3 py-3 border-b border-gray-300 outline-none transition-all duration-300 focus:border-blue-500 focus:scale-[1.02]"
                      required
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
              )}

              {/* OTP */}
              {step === 2 && (
                <div className="space-y-1">
                  <label className="block text-sm font-medium text-gray-700 transition-colors duration-300 hover:text-gray-900">
                    OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                    className="w-full pl-3 pr-3 py-3 border-b border-gray-300 outline-none transition-all duration-300 focus:border-blue-500 focus:scale-[1.02]"
                    required
                    placeholder="Enter OTP"
                  />
                </div>
              )}

              {/* Submit */}
              <div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform shadow-md hover:shadow-lg"
                  disabled={loading}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {loading && (
                    <PiSpinnerBold className="animate-spin mr-2 transition-all duration-300" />
                  )}
                  <span
                    className={`transition-all duration-300 ${
                      isHovered ? "tracking-wide" : ""
                    }`}
                  >
                    {step === 1 ? "Next" : "Verify OTP"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
