import { type ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Breadcrumbs from "../Breadcrumbs";

interface LayoutProps {
  children?: ReactNode;
}

export const PendaftarLayout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <div className="mb-4 sm:mb-6">
          <Breadcrumbs />
        </div>

        <div className="p-3 sm:p-5 lg:p-6 min-h-[60vh]">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default PendaftarLayout;
