import { lazy } from "react";

const YudisiumFeature = lazy(() => import("../../features/staff/Yudisium"));

export const Yudisium = () => {
  return <YudisiumFeature />;
};
