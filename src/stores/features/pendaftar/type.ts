export interface PendaftarState {
  isLoading: boolean;
  profile: any | null;
  jadwal: any | null;
  kartuUjian: any | null;
  status: any | null;
  error: string | null;
  isLoadingUpload: boolean;
  errorUpload: string | null
}
