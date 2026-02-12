export interface PendaftarState {
  isLoading: boolean;
  profile: Pendaftar | null;
  jadwal: any | null;
  kartuUjian: any | null;
  status: any | null;
  error: string | null;
  isLoadingUpload: boolean;
  errorUpload: string | null
}

export type StatusPendaftar = "baru" | "aktif" | "verifikasi" | "lulus" | "tidak_lulus";

export interface Pendaftar {
  id: number;
  nomor_pendaftaran: string;
  kode_akses: string;
  nama_lengkap: string;
  no_tele: string;

  pendidikan_institusi: string;
  pendidikan_jurusan: string;
  pendidikan_jenjang: string;
  tahun_lulus: number;

  prodiId: number;
  jadwalUjianId: number;
  foto_path: string | null;

  telegram_token: string;
  telegram_chat_id: string;
  telegram_username: string;
  status: StatusPendaftar;

  createdAt: string; 
  updatedAt: string; 
}
