/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../../../constants';
import { getAuthHeader } from '../../../utils/auth';

/* ================== STATE ================== */
export interface StaffState {
  isLoading: boolean;
  error: string | null;
}

const initialState: StaffState = {
  isLoading: false,
  error: null,
};

/* ================== THUNKS ================== */
/* ===== VERIFIKASI DOKUMEN ===== */

export const verifikasiDokumen = createAsyncThunk(
  'staff/verifikasiDokumen',
  async (
    {
      id,
      status_verifikasi,
      catatan,
    }: { id: number; status_verifikasi: 'valid' | 'invalid'; catatan?: string },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.put(
        `${API_URL}/staff/dokumen/${id}/verifikasi`,
        { status_verifikasi, catatan },
        getAuthHeader(),
      );

      toast.success(res.data?.msg || 'Dokumen berhasil diverifikasi');
      return { id, status_verifikasi, catatan };
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal verifikasi dokumen');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

/* ===== INPUT NILAI ===== */

export const inputNilai = createAsyncThunk(
  'staff/inputNilai',
  async (
    payload: {
      pendaftarId: number;
      jadwalId: number;
      nilai: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.post(
        `${API_URL}/staff/nilai`,
        payload,
        getAuthHeader(),
      );

      toast.success('Nilai berhasil disimpan');
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal input nilai');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

/* ===== SET KELULUSAN ===== */

export const setKelulusan = createAsyncThunk(
  'staff/setKelulusan',
  async (
    payload: {
      pendaftarId: number;
      status: 'lulus' | 'tidak_lulus';
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.put(
        `${API_URL}/staff/kelulusan`,
        payload,
        getAuthHeader(),
      );

      toast.success(res.data?.msg || 'Status kelulusan berhasil diupdate');
      return payload;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal update kelulusan');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

/* ================== SLICE ================== */

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    resetStaffState: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // ===== VERIFIKASI DOKUMEN
      .addCase(verifikasiDokumen.pending, state => {
        state.isLoading = true;
      })
      .addCase(verifikasiDokumen.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(verifikasiDokumen.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===== INPUT NILAI
      .addCase(inputNilai.pending, state => {
        state.isLoading = true;
      })
      .addCase(inputNilai.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(inputNilai.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===== SET KELULUSAN
      .addCase(setKelulusan.pending, state => {
        state.isLoading = true;
      })
      .addCase(setKelulusan.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(setKelulusan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  reducer: staffReducer,
  actions: { resetStaffState },
} = staffSlice;