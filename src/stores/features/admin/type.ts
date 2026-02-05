export interface AdminState {
  isLoading: boolean;
  prodi: any[];
  jadwal: any[];
  error: string | null;
}

export interface PendaftarItem {
  id: number;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  no_tele: string;
  pendidikan_institusi?: string;
  pendidikan_jenjang?: string;
  tahun_lulus?: number;
  status: string;
  createdAt: string;
}

export interface PendaftarAdminState {
  data: PendaftarItem[];
  isLoading: boolean;
  error: string | null;
}