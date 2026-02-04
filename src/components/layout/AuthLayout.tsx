import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="w-full max-w-xl flex justify-center flex-col items-center">
        <div className="mb-6 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Selamat Datang</h1>
          <p className="mt-2 text-2xl text-gray-600">
            di Sistem PMB Universitas Gemilang Sapta Perdana
          </p>
        </div>
      </div>

      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
