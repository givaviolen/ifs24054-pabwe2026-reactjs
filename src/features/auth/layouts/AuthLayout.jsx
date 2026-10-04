import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getAccessToken } from "../../../helpers/apiHelper";

const AuthLayout = () => {
  const token = getAccessToken();
  if (token) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl flex overflow-hidden">
        <div className="w-full lg:w-1/2 p-8 sm:p-12">
          <Outlet />
        </div>
        <div className="hidden lg:flex w-1/2 bg-blue-600 p-12 items-center justify-center text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Lost & Founds</h2>
            <p className="text-blue-100">Platform pelaporan barang hilang dan temuan terintegrasi.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
