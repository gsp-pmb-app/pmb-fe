import { Routes, Route, Navigate } from "react-router-dom";
import PublicRoute from "./PublicRoute";
import PrivateRoute from "./PrivateRoute";
import AuthLayout from "../components/layout/AuthLayout";

import {
  Home,
  Jadwal,
  KartuUjian,
  LoginAdmin,
  LoginPendaftar,
  Nilai,
  Pendaftar,
  Prodi,
  RegisterPendaftar,
  RegisterSukses,
  Ruangan,
  StatusKelulusan,
  Verifikasi,
  CheckStatus,
} from "../pages";

export default function AppRoutes() {
  return (
    <Routes>
      {/* ===== PUBLIC ===== */}
      <Route element={<PublicRoute />}>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPendaftar />} />
          <Route path="/auth/login-admin" element={<LoginAdmin />} />
          <Route path="/auth/register" element={<CheckStatus />} />
          <Route path="check-status" element={<RegisterSukses />} />
        </Route>
        <Route path="/auth/register-sukses" element={<RegisterSukses />} />
      </Route>

      {/* ===== PRIVATE ===== */}
      <Route element={<PrivateRoute />}>
        {/* pendaftar */}
        <Route path="/home" element={<Home />} />
        <Route path="/pendaftar/kartu-ujian" element={<KartuUjian />} />
        <Route path="/pendaftar/status" element={<StatusKelulusan />} />

        {/* dashboard */}
        <Route path="/dashboard" element={<Pendaftar />} />

        {/* admin */}
        <Route path="/admin/jadwal" element={<Jadwal />} />
        <Route path="/admin/prodi" element={<Prodi />} />
        <Route path="/admin/ruangan" element={<Ruangan />} />

        {/* staff */}
        <Route path="/staff/nilai" element={<Nilai />} />
        <Route path="/staff/verifikasi" element={<Verifikasi />} />
      </Route>

      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}
