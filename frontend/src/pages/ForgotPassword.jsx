import React, { useState } from "react";
import { FiMail, FiLock, FiKey } from "react-icons/fi";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const DEMO_OTP = "112233";

  const handleEmailOtpSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Email is required!");
      return;
    }

    if (otp !== DEMO_OTP) {
      setError("Invalid OTP. Try again.");
      return;
    }

    setStep(2); // ✅ move to password reset step
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    console.log({ email, otp, newPassword, confirmPassword });
    alert("Password reset successful ✅ (demo)");
  };

  return (
    <div className="grid place-items-center h-[600px] text-gray-900">
      <div className="w-[780px] max-w-full bg-transparent">
        <div className="bg-transparent flex flex-col">
          <div className="text-center mb-6">
            <h2 className="text-3xl text-gray-700 font-semibold mt-2 mb-2">
              Forgot Password
            </h2>
            <p className="text-gray-600 text-sm">
              {step === 1 && "Enter your email and OTP to continue"}
              {step === 2 && "Set a new password"}
            </p>
          </div>

          {/* Step 1: Email + OTP */}
          {step === 1 && (
            <form onSubmit={handleEmailOtpSubmit}>
              <div className="relative mb-4">
                <FiMail className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="relative mb-6">
                <FiKey className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Enter OTP (demo: 112233)"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition"
              >
                Next
              </button>
            </form>
          )}

          {/* Step 2: Reset Password */}
          {step === 2 && (
            <form onSubmit={handlePasswordSubmit}>
              <div className="relative mb-4">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
                />
              </div>

              <div className="relative mb-6">
                <FiLock className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 text-gray-900 rounded-full border-2 border-gray-300 outline-none focus:border-blue-500 transition"
                />
              </div>

              {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition"
              >
                Reset Password
              </button>
            </form>
          )}

          {/* Back to login */}
          <div className="flex justify-center items-center text-gray-600 text-sm mt-6">
            <span>Remembered your password?</span>
            <Link
              to="/register"
              className="ml-2 text-blue-600 font-medium hover:underline"
            >
              Sign in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
