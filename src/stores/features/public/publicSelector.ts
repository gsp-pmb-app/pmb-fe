import type { RootState } from '../../store';

/* ===== PRODI ===== */
export const selectCheckKelulusan = (state: RootState) => state.public.statusKelulusan.checkStatus;
export const selectCheckKelulusanLoading = (state: RootState) => state.public.statusKelulusan.isLoading;
export const selectCheckKelulusanError = (state: RootState) => state.public.statusKelulusan.error;