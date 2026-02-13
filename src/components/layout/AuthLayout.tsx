import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../Navbar";

export const AuthLayout = () => {
  const location = useLocation();
  const isCheckStatus = location.pathname === "/check-status";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6">
        <div
          className={`w-full max-w-xl text-center ${
            isCheckStatus ? "mb-3" : "mb-6"
          }`}
        >
          <h1 className="text-2xl sm:text-4xl font-bold text-gray-900">
            {isCheckStatus ? "Check Status Kelulusan Ujian" : "Selamat Datang"}
          </h1>

          {!isCheckStatus && (
            <p className="mt-2 text-sm sm:text-lg text-gray-600">
              di Sistem PMB Universitas Gemilang Sapta Perdana
            </p>
          )}
        </div>

        <div className="w-full max-w-md p-4 sm:p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
