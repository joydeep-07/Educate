import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import Home from "./pages/Home";
import Root from "./layouts/Root";
import Preloader from "./pages/Preloader";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import DashBoard from "./pages/DashBoard";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Profile from "./pages/Profile";
import AddNotes from "./components/AddNotes";
import Messages from "./components/Messages";
import Likes from './components/Likes'
import Notification from "./components/Notification";
import NotFound from "./components/NotFound";
// Animated wrapper using GSAP
const AnimatedRoute = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    // Animate in
    gsap.fromTo(
      el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "aniticipate" }
    );

    return () => {
      // Animate out when component unmounts
      gsap.to(el, { opacity: 0, y: -100, duration: 0.8, ease: "aniticipate" });
    };
  }, []);

  return (
    <div ref={ref} className=" w-full">
      {children}
    </div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<Root />}>
        <Route
          index
          element={
            <AnimatedRoute>
              <Home />
            </AnimatedRoute>
          }
        />

        {/* ======================= PROTECTED ROUTES ==========================  */}
        <Route
          path="/dashboard"
          element={
            <AnimatedRoute>
              <ProtectedRoute>
                <DashBoard />
              </ProtectedRoute>
            </AnimatedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <AnimatedRoute>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </AnimatedRoute>
          }
        />

        <Route
          path="/upload"
          element={
            <AnimatedRoute>
              <ProtectedRoute>
                <AddNotes />
              </ProtectedRoute>
            </AnimatedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <AnimatedRoute>
              <ProtectedRoute>
                <Messages />
              </ProtectedRoute>
            </AnimatedRoute>
          }
        />

        <Route
          path="/Likes"
          element={
            <AnimatedRoute>
              <ProtectedRoute>
                <Likes />
              </ProtectedRoute>
            </AnimatedRoute>
          }
        />

        <Route
          path="/notifications"
          element={
            <AnimatedRoute>
              <ProtectedRoute>
                <Notification />
              </ProtectedRoute>
            </AnimatedRoute>
          }
        />
        {/* ======================= PROTECTED ROUTES ==========================  */}
        <Route
          path="/register"
          element={
            <AnimatedRoute>
              <Signup />
            </AnimatedRoute>
          }
        />
        <Route
          path="/forgot/password"
          element={
            <AnimatedRoute>
              <ForgotPassword />
            </AnimatedRoute>
          }
        />

        <Route
          path="*"
          element={
            <AnimatedRoute>
              <NotFound />
            </AnimatedRoute>
          }
        />
      </Route>
    </Routes>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Preloader />;

  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  );
};

export default App;
