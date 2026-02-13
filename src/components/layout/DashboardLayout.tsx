import { useState, type ReactNode } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
  UsersIcon,
  AcademicCapIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel } from "@headlessui/react";

import { getRole } from "../../utils/auth";

interface LayoutProps {
  children?: ReactNode;
}

export const menuByRole: Record<string, any[]> = {
  admin: [
    { name: "Pendaftar", href: "/dashboard", icon: UsersIcon },
    { name: "Program Studi", href: "/admin/prodi", icon: AcademicCapIcon },
    { name: "Ruangan", href: "/admin/ruangan", icon: BuildingOfficeIcon },
    { name: "Jadwal", href: "/admin/jadwal", icon: CalendarIcon },
  ],
  staff: [
    {
      name: "Verifikasi Pendaftar",
      href: "/dashboard",
      icon: DocumentCheckIcon,
    },
    {
      name: "Unggah Nilai",
      href: "/staff/nilai",
      icon: ClipboardDocumentListIcon,
    },
    { name: "Yudisium", href: "/staff/yudisium", icon: AcademicCapIcon },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export const DashboardLayout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const role = getRole();
  const navigation = role ? (menuByRole[role] ?? []) : [];

  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/auth/login-admin");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ================= MOBILE SIDEBAR ================= */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

        <div className="fixed inset-0 flex">
          <DialogPanel className="relative w-72 max-w-xs bg-gray-900 shadow-xl flex flex-col">
            <div className="flex h-16 items-center justify-between px-4 text-white font-semibold border-b border-white/10 shrink-0">
              Dashboard
              <button onClick={() => setSidebarOpen(false)}>
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        classNames(
                          isActive
                            ? "bg-white/10 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white",
                          "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold transition",
                        )
                      }
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-white/10 p-3 shrink-0">
              <button
                onClick={handleSignOut}
                className="w-full flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
              >
                <ArrowRightOnRectangleIcon className="h-5 w-5" />
                Sign Out
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>

      {/* ================= DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-gray-900 shadow-lg">
        <div className="flex h-16 items-center px-6 text-white font-semibold border-b border-white/10">
          Dashboard
        </div>

        <nav className="flex flex-1 flex-col px-3 py-4">
          <ul className="space-y-1">
            {navigation.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    classNames(
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white",
                      "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold transition",
                    )
                  }
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>

          <button
            onClick={handleSignOut}
            className="mt-auto flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
          >
            <ArrowRightOnRectangleIcon className="h-5 w-5" />
            Sign Out
          </button>
        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <div className="lg:pl-72 flex flex-col min-h-screen">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-x-3 border-b bg-white px-4 sm:px-6 shadow-sm">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          <h1 className="text-sm sm:text-base font-semibold text-gray-900 capitalize">
            {role} Dashboard
          </h1>
        </header>

        <main className="flex-1 p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">{children ?? <Outlet />}</div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
