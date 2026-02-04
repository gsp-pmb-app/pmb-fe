export interface AuthState {
  isLoading: boolean;
  isAuthenticated: boolean;
  role: string | null;
  accessToken: string | null;
  error: string | null;
}

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPendaftarPayload {
  nama_lengkap: string;
  no_tele: string;
}

export interface LoginPendaftarPayload {
  nomor_pendaftaran: string;
  kode_akses: string;
}