import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Root from "./layouts/Root";
import Preloader from "./pages/Preloader";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Preloader />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<h1>LOGIN</h1>} />
          <Route path="/register" element={<Signup/>} />
          <Route path="/forgot/password" element={<ForgotPassword/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
