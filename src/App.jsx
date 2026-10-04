import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./features/auth/layouts/AuthLayout";
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";

// Sementara komponen Dashboard kosong
const DashboardPlaceholder = () => (
  <div className="min-h-screen bg-slate-100 p-8">
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Dashboard Lost & Founds</h1>
      <p>Halo! Anda sudah masuk ke sistem.</p>
    </div>
  </div>
);

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthLayout />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>
      <Route path="/" element={<DashboardPlaceholder />} />
    </Routes>
  );
}

export default App;
