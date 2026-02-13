import { useState } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import {
  Bars3Icon,
  XMarkIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { Dialog, DialogPanel, TransitionChild } from "@headlessui/react";

import {
  UsersIcon,
  AcademicCapIcon,
  CalendarIcon,
  BuildingOfficeIcon,
  DocumentCheckIcon,
  ClipboardDocumentListIcon,
} from "@heroicons/react/24/outline";
import { getRole } from "../../utils/auth";

export const menuByRole = {
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

export const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const role = getRole();
  const navigation = role ? menuByRole[role] : [];

  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/auth/login-admin");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* MOBILE SIDEBAR */}
      <Dialog
        open={sidebarOpen}
        onClose={setSidebarOpen}
        className="relative z-50 lg:hidden"
      >
        <div className="fixed inset-0 bg-gray-900/80" />

        <div className="fixed inset-0 flex">
          <DialogPanel className="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild>
              <div className="absolute top-0 left-full flex w-16 justify-center pt-5">
                <button onClick={() => setSidebarOpen(false)}>
                  <XMarkIcon className="h-6 w-6 text-white" />
                </button>
              </div>
            </TransitionChild>

            <aside className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4">
              <div className="flex h-16 items-center text-white font-semibold">
                Dashboard
              </div>

              <nav className="flex flex-1 flex-col">
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
                            "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold",
                          )
                        }
                      >
                        <item.icon className="h-6 w-6 shrink-0" />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={handleSignOut}
                  className="mt-auto flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <ArrowRightOnRectangleIcon className="h-6 w-6" />
                  Sign Out
                </button>
              </nav>
            </aside>
          </DialogPanel>
        </div>
      </Dialog>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-gray-900">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-4">
          <div className="flex h-16 items-center text-white font-semibold">
            Dashboard
          </div>

          <nav className="flex flex-1 flex-col">
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
                        "group flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold",
                      )
                    }
                  >
                    <item.icon className="h-6 w-6 shrink-0" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <button
              onClick={handleSignOut}
              className="mt-auto flex items-center gap-x-3 rounded-md p-2 text-sm font-semibold text-red-400 hover:bg-red-500/10 hover:text-red-300"
            >
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
              Sign Out
            </button>
          </nav>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <div className="lg:pl-72">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-x-4 border-b bg-white px-4 shadow-sm">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
            <Bars3Icon className="h-6 w-6" />
          </button>
          <h1 className="text-sm font-semibold text-gray-900 capitalize">
            {role} Dashboard
          </h1>
        </header>

        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
