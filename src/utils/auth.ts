export const getAccessToken = () =>
  sessionStorage.getItem("accessToken");

export const getRole = () => {
  const role = sessionStorage.getItem("role");
  return role === "admin" || role === "staff" || role === "pendaftar" ? role : null;
};

export const isLoggedIn = () =>
  !!getAccessToken();

export const isStaffOrAdmin = () =>
  isLoggedIn() && !!getRole();

export const isPendaftar = () =>
  isLoggedIn() && !getRole();


export const getAuthHeader = () => ({
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  },
});