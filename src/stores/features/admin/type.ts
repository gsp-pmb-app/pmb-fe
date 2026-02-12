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
  pendidikan_institusi?: string;
  pendidikan_jenjang?: string;
  tahun_lulus?: number;
  status: string;
  createdAt: string;
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
  data: PendaftarItem[];
  isLoading: boolean;
  error: string | null;
}