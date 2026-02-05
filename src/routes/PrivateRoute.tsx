import { getRole, getAccessToken } from "../utils/auth";
import DashboardLayout from "../components/layout/DashboardLayout";
import PendaftarLayout from "../components/layout/PendaftarLayout";
import { Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const role = getRole();
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return role !== "pendaftar" ? <DashboardLayout /> : <PendaftarLayout />;
};

export default PrivateRoute;
