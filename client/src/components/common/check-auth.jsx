import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

    // User not logged in
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/signup")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

 // User already logged in and trying to access login/signup
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/signup"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

    // Normal user trying to access admin routes
  if (
    isAuthenticated &&
    location.pathname.includes("admin") &&
    user?.role !== "admin"
  ) {
    return <Navigate to="/unauth-page" />;
  }

   // Admin trying to access shopping routes
  if (
    isAuthenticated &&
    location.pathname.includes("/shop") &&
    user?.role === "admin"
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
};

export default CheckAuth;
