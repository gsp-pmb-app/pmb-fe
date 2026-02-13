import type { RootState } from '../../store';

export const selectYudisium = (state: RootState) => state.private.staff.yudisium;
export const selectStaffLoading = (state: RootState) => state.private.staff.isLoading;
export const selectStaffError = (state: RootState) => state.private.staff.error;
