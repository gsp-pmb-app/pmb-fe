import { lazy } from "react";

const KartuUjianFeature = lazy(
  () => import("../../features/pendaftar/KartuUjian"),
);

export const KartuUjian = () => {
  return <KartuUjianFeature />;
};
