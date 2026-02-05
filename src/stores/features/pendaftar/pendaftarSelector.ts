import type { RootState } from '../../store';

/* ================== PROFILE ================== */
export const selectPendaftarProfile = (state: RootState) =>
  state.private.pendaftar.profile;

export const selectPendaftarProfileLoading = (state: RootState) =>
  state.private.pendaftar.isLoading;


/* ================== JADWAL UJIAN ================== */
export const selectPendaftarJadwal = (state: RootState) =>
  state.private.pendaftar.jadwal;

export const selectPendaftarJadwalLoading = (state: RootState) =>
  state.private.pendaftar.isLoading;


/* ================== KARTU UJIAN ================== */
export const selectPendaftarKartuUjian = (state: RootState) =>
  state.private.pendaftar.kartuUjian;

export const selectPendaftarKartuUjianLoading = (state: RootState) =>
  state.private.pendaftar.isLoading;


/* ================== STATUS KELULUSAN ================== */
export const selectPendaftarStatus = (state: RootState) =>
  state.private.pendaftar.status;

export const selectPendaftarStatusLoading = (state: RootState) =>
  state.private.pendaftar.isLoading;


/* ================== UPLOAD DOKUMEN ================== */
export const selectUploadDokumenLoading = (state: RootState) =>
  state.private.pendaftar.isLoadingUpload;

export const selectPendaftarErrorUpload = (state: RootState) =>
  state.private.pendaftar.errorUpload;

/* ================== ERROR ================== */
export const selectPendaftarError = (state: RootState) =>
  state.private.pendaftar.error;