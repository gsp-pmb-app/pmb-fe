import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getRole, getAccessToken } from "../utils/auth";
import DashboardLayout from "../components/layout/DashboardLayout";
import PendaftarLayout from "../components/layout/PendaftarLayout";

const PrivateRoute = () => {
  const role = getRole();
  const token = getAccessToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  const path = location.pathname;

  if (role === "pendaftar") {
    if (
      path.startsWith("/admin") ||
      path.startsWith("/staff") ||
      path === "/dashboard"
    ) {
      return <Navigate to="/home" replace />;
    }
  }

  if (role === "staff") {
    if (path.startsWith("/admin")) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return role !== "pendaftar" ? (
    <DashboardLayout>
      <Outlet />
    </DashboardLayout>
  ) : (
    <PendaftarLayout>
      <Outlet />
    </PendaftarLayout>
  );
};

export default PrivateRoute;
