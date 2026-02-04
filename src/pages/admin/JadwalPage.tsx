import { lazy } from "react";

const JadwalFeature = lazy(() => import("../../features/admin/Jadwal"));

export const Jadwal = () => {
  return <JadwalFeature />;
};
