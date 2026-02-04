import { Navigate, Outlet } from "react-router-dom";
import { isStaffOrAdmin, isPendaftar } from "../utils/auth";

const PublicRoute = () => {
  if (isStaffOrAdmin()) return <Navigate to="/dashboard" replace />;
  if (isPendaftar()) return <Navigate to="/home" replace />;

  return <Outlet />;
};

export default PublicRoute;
