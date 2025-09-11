import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

const Signup = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="grid place-items-center overflow-hidden relative">
      <div className="mt-35 mb-10 h-[500px]">
        <div className="relative w-[780px] max-w-full bg-transparent">
          {/* Login Form */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              isLogin
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <Login switchToRegister={() => setIsLogin(false)} />
          </div>

          {/* Register Form */}
          <div
            className={`absolute inset-0 transition-all duration-500 ${
              !isLogin
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-full"
            }`}
          >
            <Register switchToLogin={() => setIsLogin(true)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
