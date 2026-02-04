import { getRole } from "../utils/auth";
import DashboardLayout from "../components/layout/DashboardLayout";
import PendaftarLayout from "../components/layout/PendaftarLayout";

const PrivateRoute = () => {
  const role = getRole();

  return role ? <DashboardLayout /> : <PendaftarLayout />;
};

export default PrivateRoute;
