import type { StatusPendaftar } from "../pendaftar";

export interface AdminState {
  prodi: {
    data: Prodi[];
    isLoading: boolean;
    error: string | null;
  };
  ruangan: {
    data: Ruangan[];
    isLoading: boolean;
    error: string | null;
  };
  jadwal: {
    data: Jadwal[];
    isLoading: boolean;
    error: string | null;
  };
}

export type JenjangProdi = 'S2' | 'S3';

export interface Prodi {
  id: number;
  nama_prodi: string;
  jenjang: JenjangProdi;
  createdAt: string;
  updatedAt: string;
}
export interface PendaftarItem {
  id: number;
  nomor_pendaftaran: string;
  nama_lengkap: string;
  no_tele: string;
  tanggal_lahir: string;

  pendidikan_institusi: string;
  pendidikan_jurusan: string;
  pendidikan_jenjang: string;
  tahun_lulus: number;

  prodiId: number;
  jadwalUjianId: number;
  foto_path: string | null;
  file_path: string | null;

  telegram_username: string;
  status: StatusPendaftar;

  createdAt: string; 
  updatedAt: string; 
}

export interface Ruangan {
  id: number;
  nama_ruangan: string;
  kapasitas: number;
  lokasi: string;
  createdAt?: string;
  updatedAt?: string;
}

export type SesiUjian = 'pagi' | 'siang';

export interface Jadwal {
  id: number;
  tanggal: string;        
  sesi: SesiUjian;
  kuota: number;
  ruanganId?: number | null;
  prodiId?: number | null;
  ruangan?: Ruangan;
  prodi?: Prodi;
  createdAt: string;
  updatedAt: string;
}


export interface PendaftarAdminState {
list: {
    data: PendaftarItem[];
    isLoading: boolean;
    error: string | null;
  };
  detail: {
    data: PendaftarItem | null;
    isLoading: boolean;
    error: string | null;
}
}