import { lazy } from "react";

const CheckStatusFeature = lazy(() => import("../features/CheckStatus"));

export const CheckStatus = () => {
  return <CheckStatusFeature />;
};
