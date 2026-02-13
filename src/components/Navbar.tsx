import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/auth";

export default function Navbar() {
  const navigate = useNavigate();
  const token = getAccessToken();

  const handleSignOut = () => {
    sessionStorage.clear();
    navigate("/auth/login");
  };

  const handleSignIn = () => {
    navigate("/auth/login");
  };

  const handleCheckStatus = () => {
    navigate("/check-status");
  };

  return (
    <Disclosure as="nav" className="bg-gray-800 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* LEFT */}
          <div className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-9 w-9 rounded-full object-cover"
            />

            {/* Title (responsive) */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              <span className="text-sm sm:text-lg font-semibold text-white leading-tight">
                PMB Universitas GSP
              </span>

              {/* Desktop Menu */}
              {!token && (
                <div className="hidden sm:flex">
                  <button
                    onClick={handleCheckStatus}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition"
                  >
                    Check Kelulusan
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT DESKTOP */}
          <div className="hidden sm:flex items-center">
            <Menu as="div" className="relative">
              <MenuButton className="flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                <UserCircleIcon className="h-8 w-8 text-white" />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline-1 outline-black/5"
              >
                <MenuItem>
                  <button
                    onClick={token ? handleSignOut : handleSignIn}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100"
                  >
                    {token ? "Sign out" : "Sign in"}
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>

          {/* MOBILE BUTTON */}
          <div className="sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/10 hover:text-white transition">
              <Bars3Icon className="block size-6 group-data-open:hidden" />
              <XMarkIcon className="hidden size-6 group-data-open:block" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      {/* MOBILE PANEL */}
      <DisclosurePanel className="sm:hidden bg-gray-800 border-t border-white/10">
        <div className="px-3 py-3 space-y-2">
          <p className="text-sm text-gray-300">
            PMB Universitas Gemilang Sapta Perdana
          </p>

          {!token && (
            <button
              onClick={handleCheckStatus}
              className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              Check Kelulusan
            </button>
          )}

          <button
            onClick={token ? handleSignOut : handleSignIn}
            className="block w-full rounded-md px-3 py-2 text-left text-sm font-medium text-gray-400 hover:bg-white/10 hover:text-white transition"
          >
            {token ? "Sign out" : "Sign in"}
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
