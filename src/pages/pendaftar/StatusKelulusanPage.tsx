import { lazy } from "react";

const StatusKelulusanFeature = lazy(
  () => import("../../features/pendaftar/StatusKelulusan"),
);

export const StatusKelulusan = () => {
  return <StatusKelulusanFeature />;
};
