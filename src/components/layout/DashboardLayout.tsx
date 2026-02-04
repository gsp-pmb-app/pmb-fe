import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar */}
      <Dialog open={sidebarOpen} onClose={setSidebarOpen} className="lg:hidden">
        <div className="fixed inset-0 bg-black/30" />
        <DialogPanel className="fixed inset-y-0 left-0 w-64 bg-white p-4">
          <button onClick={() => setSidebarOpen(false)}>
            <XMarkIcon className="h-6 w-6" />
          </button>
          <nav className="mt-6 space-y-2">
            <div className="text-sm font-medium text-gray-700">Dashboard</div>
          </nav>
        </DialogPanel>
      </Dialog>

      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:w-64 lg:bg-white lg:p-4">
        <div className="text-lg font-semibold">Dashboard</div>
        <nav className="mt-6 space-y-2 text-sm text-gray-700">
          <div>Menu 1</div>
          <div>Menu 2</div>
        </nav>
      </aside>

      {/* Main area */}
      <div className="lg:pl-64">
        {/* Topbar */}
        <header className="flex h-16 items-center border-b bg-white px-4">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="ml-4 font-semibold">Dashboard</h1>
        </header>

        {/* Page content */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
