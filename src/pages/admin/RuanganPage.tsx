import { lazy } from "react";

const RuanganFeature = lazy(() => import("../../features/admin/Ruangan"));

export const Ruangan = () => {
  return <RuanganFeature />;
};
