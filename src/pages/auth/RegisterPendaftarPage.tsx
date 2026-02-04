import { lazy } from "react";

const RegisterPendaftarFeature = lazy(
  () => import("../../features/auth/RegisterPendaftar"),
);

export const RegisterPendaftar = () => {
  return <RegisterPendaftarFeature />;
};
