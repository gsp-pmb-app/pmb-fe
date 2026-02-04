import { lazy } from "react";

const RegisterSuksesFeature = lazy(
  () => import("../../features/auth/RegisterSukses"),
);

export const RegisterSukses = () => {
  return <RegisterSuksesFeature />;
};
