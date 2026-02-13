import { useState } from "react";
import { HomeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

type Page = {
  name: string;
  href: string;
};

export default function Breadcrumbs() {
  const [currentPage, setCurrentPage] = useState<string>("Home");

  const pages: Page[] = [
    { name: "Kartu Ujian", href: "/pendaftar/kartu-ujian" },
    { name: "Check Status", href: "/pendaftar/status" },
  ];

  return (
    <nav aria-label="Breadcrumb" className="flex">
      <ol
        role="list"
        className="flex space-x-4 rounded-md bg-white px-6 shadow-sm"
      >
        <li className="flex">
          <div className="flex items-center">
            <Link
              to="/home"
              onClick={() => setCurrentPage("")}
              className={
                currentPage === "Home"
                  ? "text-indigo-600"
                  : "text-gray-400 hover:text-gray-500"
              }
            >
              <HomeIcon aria-hidden="true" className="size-5 shrink-0" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>

        {pages.map((page) => {
          const isActive = currentPage === page.name;

          return (
            <li key={page.name} className="flex">
              <div className="flex items-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 24 44"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                  className="h-full w-6 shrink-0 text-gray-200"
                >
                  <path d="M.293 0l22 22-22 22h1.414l22-22-22-22H.293z" />
                </svg>

                <Link
                  to={page.href}
                  onClick={() => setCurrentPage(page.name)}
                  aria-current={isActive ? "page" : undefined}
                  className={`ml-2 lg:ml-4 text-xs lg:text-sm font-medium ${
                    isActive
                      ? "text-indigo-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {page.name}
                </Link>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
