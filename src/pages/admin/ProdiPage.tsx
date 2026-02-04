import { lazy } from "react";

const ProdiFeature = lazy(() => import("../../features/admin/Prodi"));

export const Prodi = () => {
  return <ProdiFeature />;
};
