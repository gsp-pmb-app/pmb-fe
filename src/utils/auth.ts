export const getAccessToken = () =>
  sessionStorage.getItem("accessToken");

export const getRole = () =>
  sessionStorage.getItem("role");

export const isLoggedIn = () =>
  !!getAccessToken();

export const isStaffOrAdmin = () =>
  isLoggedIn() && !!getRole();

export const isPendaftar = () =>
  isLoggedIn() && !getRole();
