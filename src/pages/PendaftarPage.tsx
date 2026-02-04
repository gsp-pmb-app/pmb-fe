import { lazy } from "react";

const PendaftarFeature = lazy(() => import("../features/Pendaftar"));

export const Pendaftar = () => {
  return <PendaftarFeature />;
};
