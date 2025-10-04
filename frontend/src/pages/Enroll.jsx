import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Success from "../components/Success";

const Enroll = () => {
  const [step, setStep] = useState("loading"); // "loading" -> "success"
  const navigate = useNavigate();

  useEffect(() => {
    // Show loader for 2 seconds
    const timer1 = setTimeout(() => {
      setStep("success");
    }, 1500);

    // Redirect after 5 seconds of success (total 7s)
    const timer2 = setTimeout(() => {
      navigate("/courses");
    }, 5000);

    // Cleanup
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [navigate]);

  return (
    <>
      {step === "loading" && <Loader />}
      {step === "success" && <Success />}
    </>
  );
};

export default Enroll;
