import { lazy } from "react";

const LoginAdminFeature = lazy(() => import("../../features/auth/LoginAdmin"));

export const LoginAdmin = () => {
  return <LoginAdminFeature />;
};
