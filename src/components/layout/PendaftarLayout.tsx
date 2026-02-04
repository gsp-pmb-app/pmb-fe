import { Outlet } from "react-router-dom";

export const PendaftarLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <h1 className="text-lg font-semibold text-gray-900">
            Penerimaan Mahasiswa Baru
          </h1>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
};

export default PendaftarLayout;
