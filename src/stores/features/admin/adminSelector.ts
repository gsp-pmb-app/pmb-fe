import type { RootState } from '../../store';

/* ===== PRODI ===== */
export const selectProdi = (state: RootState) => state.private.admin.prodi.data;
export const selectProdiLoading = (state: RootState) => state.private.admin.prodi.isLoading;
export const selectProdiError = (state: RootState) => state.private.admin.prodi.error;

/* ===== RUANGAN ===== */
export const selectRuangan = (state: RootState) => state.private.admin.ruangan.data;
export const selectRuanganLoading = (state: RootState) => state.private.admin.ruangan.isLoading;
export const selectRuanganError = (state: RootState) => state.private.admin.ruangan.error;

/* ===== JADWAL ===== */
export const selectJadwal = (state: RootState) => state.private.admin.jadwal.data;
export const selectJadwalLoading = (state: RootState) => state.private.admin.jadwal.isLoading;
export const selectJadwalError = (state: RootState) => state.private.admin.jadwal.error;
