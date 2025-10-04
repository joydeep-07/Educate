import React from "react";
import Lottie from "lottie-react";
import check from "../assets/animation/done.json";

const Success = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-48 h-48">
        <Lottie
          animationData={check}
          loop={false}
        />
      </div>
      <p className="mt-6 text-gray-600 font-medium text-lg animate-pulse text-center">
        Enrollment Successful! <br />
        You will be redirected to your courses shortly...
      </p>
    </div>
  );
};

export default Success;
