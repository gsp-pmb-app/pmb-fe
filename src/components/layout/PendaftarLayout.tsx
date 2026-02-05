import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import Breadcrumbs from "../Breadcrumbs";

export const PendaftarLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navbar />

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <div className="mb-8">
          <Breadcrumbs />
        </div>
        <div className="p-4 rounded-lg bg-gray-100 border border-gray-200 min-h-96">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default PendaftarLayout;
