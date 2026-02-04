import { lazy } from "react";

const NilaiFeature = lazy(() => import("../../features/staff/Nilai"));

export const Nilai = () => {
  return <NilaiFeature />;
};
