import { lazy } from "react";

const VerifikasiFeature = lazy(() => import("../../features/staff/Verifikasi"));

export const Verifikasi = () => {
  return <VerifikasiFeature />;
};
