import { lazy } from "react";

const HomeFeature = lazy(() => import("../../features/pendaftar/Home"));

export const Home = () => {
  return <HomeFeature />;
};
