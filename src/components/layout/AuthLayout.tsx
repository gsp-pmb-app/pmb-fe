import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";

export const AuthLayout = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4">
        {location.pathname !== "/check-status" ? (
          <div className="w-full max-w-xl text-center mb-6">
            <h1 className="text-4xl font-bold text-gray-900">Selamat Datang</h1>
            <p className="mt-2 text-lg text-gray-600">
              di Sistem PMB Universitas Gemilang Sapta Perdana
            </p>
          </div>
        ) : (
          <div className="w-full max-w-xl text-center mb-2">
            <h1 className="text-4xl font-bold text-gray-900">
              Check Status Kelulusan Ujian
            </h1>
          </div>
        )}

        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
