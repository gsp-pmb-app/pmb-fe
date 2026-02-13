export interface YudisiumItem {
  nomor_pendaftaran: string;
  nama: string;
  jenjang: string;
  prodi: string;
  nilai: number | null;
  file_path: string | null;
  status: string;
}

export interface StaffState {
  isLoading: boolean;
  error: string | null;
  yudisium: YudisiumItem[];
}
