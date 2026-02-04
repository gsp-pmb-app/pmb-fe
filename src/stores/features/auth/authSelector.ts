import type { RootState } from '../../store';

export const selectAuthState = (state: RootState) => state.public.auth;

export const selectAuthLoading = (state: RootState) => state.public.auth.isLoading;
export const selectIsAuthenticated = (state: RootState) =>
  state.public.auth.isAuthenticated;

export const selectAuthToken = (state: RootState) => state.public.auth.accessToken;
export const selectAuthRole = (state: RootState) => state.public.auth.role;

export const selectAuthError = (state: RootState) => state.public.auth.error;