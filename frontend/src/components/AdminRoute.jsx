import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const admin = useSelector((state) => state.admin.admin);
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default AdminRoute;
