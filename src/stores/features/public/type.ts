export type StatusPendaftar =
  | "aktif"
  | "verifikasi"
  | "ditolak"
  | "lulus"
  | "tidak_lulus";

export interface CheckKelulusanResponse {
  nama: string;
  nomor_pendaftaran: string;
  tanggal_lahir: string;
  status: StatusPendaftar;
  jenjang?: string;
  prodi?: string;
}

export interface PublicState {
  isLoading: boolean;
  checkStatus: CheckKelulusanResponse | null;
  error: string | null;
}
