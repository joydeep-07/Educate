import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    y: 100, // start below screen
  },
  in: {
    opacity: 1,
    y: 0, // settle in place
  },
  out: {
    opacity: 0,
    y: -100, // exit upward
  },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

const AnimateNavigation = () => {
  const location = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // delay ensures initial blank screen before first animation
    const timer = setTimeout(() => setShow(true), 50);
    return () => clearTimeout(timer);
  }, []);

  if (!show) {
    // keeps screen blank on very first mount
    return <div className="w-full h-full bg-white" />;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="w-full h-full"
      >
        <Outlet />
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimateNavigation;
