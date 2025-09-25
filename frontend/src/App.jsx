import React, { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import Home from "./pages/Home";
import Root from "./layouts/Root";
import Preloader from "./pages/Preloader";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Profile from "./pages/Profile";
import NotFound from "./components/NotFound";
import AllCourses from "./pages/AllCourses";
import Quiz from "./pages/Quiz";
import AdminLogin from "./admin/AdminLogin";
import AdminPanel from "./admin/AdminPanel";
import AdminRoute from "./components/AdminRoute";
// Animated wrapper using GSAP
const AnimatedRoute = ({ children }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
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

        {/* =======================USER PROTECTED ROUTES ==========================  */}
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
          path="/quiz"
          element={
            <AnimatedRoute>
              <ProtectedRoute>
                <Quiz />
              </ProtectedRoute>
            </AnimatedRoute>
          }
        />
        {/* ======================= ADMIN PROTECTED ROUTES ==========================  */}
        <Route
          path="/admin/panel"
          element={
            <AnimatedRoute>
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            </AnimatedRoute>
          }
        />

        {/* ======================= PROTECTED ROUTES ENDS ==========================  */}
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
          path="/admin/login"
          element={
            <AnimatedRoute>
              <AdminLogin />
            </AnimatedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <AnimatedRoute>
              <AllCourses />
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
