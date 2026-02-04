import { lazy } from "react";

const LoginPendaftarFeature = lazy(
  () => import("../../features/auth/LoginPendaftar"),
);

export const LoginPendaftar = () => {
  return <LoginPendaftarFeature />;
};
