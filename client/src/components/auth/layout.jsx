import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex h-screen">

      <div className="w-1/2 bg-black text-white flex items-center justify-center">
        <h1>Welcome Ecommerce</h1>
      </div>

      <div className="w-1/2 flex items-center justify-center">
        <Outlet />
      </div>

    </div>
  );
};

export default AuthLayout;