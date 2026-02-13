/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../../../constants';
import { getAuthHeader } from '../../../utils/auth';
import type { StaffState } from './type';

/* ================== STATE ================== */

const initialState: StaffState = {
  isLoading: false,
  error: null,
  yudisium: [],
};


/* ================== THUNKS ================== */
/* ===== VERIFIKASI DOKUMEN ===== */

export const verifikasiDokumen = createAsyncThunk(
  'staff/verifikasiDokumen',
  async (
    {
      id,
      status,
    }: { id: string; status: 'verifikasi' | 'ditolak'; },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.put(
        `${API_URL}/staff/verifikasi-dokumen/${id}`,
        { status },
        getAuthHeader(),
      );

      toast.success(res.data?.msg || 'Dokumen berhasil diverifikasi');
      return { id, status };
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal verifikasi dokumen');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

/* ===== INPUT NILAI ===== */

export const inputNilai = createAsyncThunk(
  "staff/inputNilai",
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/staff/nilai`,
        formData,
        {
          ...getAuthHeader(),
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Nilai berhasil disimpan");
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Gagal input nilai");
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

export const getYudisium = createAsyncThunk(
  "staff/getYudisium",
  async (
    params: {
      status?: string;
      prodiId?: string;
      jenjang?: string;
    } = {},
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.get(
        `${API_URL}/staff/yudisium`,
        {
          ...getAuthHeader(),
          params,
        }
      );

      return res.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.msg || "Gagal mengambil data yudisium"
      );
    }
  }
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

      // ===== GET YUDISIUM
      .addCase(getYudisium.pending, state => {
        state.isLoading = true;
      })
      .addCase(getYudisium.fulfilled, (state, action) => {
        state.isLoading = false;
        state.yudisium = action.payload;
      })
      .addCase(getYudisium.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });

  },
});

export const {
  reducer: staffReducer,
  actions: { resetStaffState },
} = staffSlice;