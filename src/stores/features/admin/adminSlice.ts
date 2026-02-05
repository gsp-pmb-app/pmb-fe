/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../../../constants';
import { getAuthHeader } from '../../../utils/auth';
import type { AdminState } from './type';

const initialState: AdminState = {
  isLoading: false,
  prodi: [],
  jadwal: [],
  error: null,
};

// CREATE PRODI
export const createProdi = createAsyncThunk(
  'admin/createProdi',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/admin/prodi`,
        payload,
        getAuthHeader(),
      );
      toast.success('Program studi berhasil ditambahkan');
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal menambah prodi');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// GET PRODI
export const getProdi = createAsyncThunk(
  'admin/getProdi',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/admin/prodi`,
        getAuthHeader(),
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal mengambil prodi');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// UPDATE PRODI
export const updateProdi = createAsyncThunk(
  "admin/updateProdi",
  async (
    { id, nama_prodi, jenjang }: {
      id: number;
      nama_prodi: string;
      jenjang: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.put(
        `${API_URL}/admin/prodi/${id}`,
        { nama_prodi, jenjang },
        getAuthHeader(),
      );

      toast.success(res.data?.msg || "Prodi berhasil diupdate");
      return { id, nama_prodi, jenjang };
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Gagal update prodi");
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);


// DELETE PRODI
export const deleteProdi = createAsyncThunk(
  'admin/deleteProdi',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${API_URL}/admin/prodi/${id}`,
        getAuthHeader(),
      );
      toast.success(res.data?.msg || 'Prodi berhasil dihapus');
      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal menghapus prodi');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

/* ===== RUANGAN ===== */

export const createRuangan = createAsyncThunk(
  'admin/createRuangan',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/admin/ruangan`,
        payload,
        getAuthHeader(),
      );
      toast.success('Ruangan berhasil ditambahkan');
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal menambah ruangan');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

/* ===== JADWAL ===== */

// CREATE JADWAL
export const createJadwal = createAsyncThunk(
  'admin/createJadwal',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/admin/jadwal`,
        payload,
        getAuthHeader(),
      );
      toast.success('Jadwal ujian berhasil dibuat');
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal membuat jadwal');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// GET JADWAL
export const getJadwal = createAsyncThunk(
  'admin/getJadwal',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/admin/jadwal`,
        getAuthHeader(),
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal mengambil jadwal');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

/* ================== SLICE ================== */

const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    resetAdminState: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // ===== PRODI
      .addCase(getProdi.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProdi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prodi = action.payload;
      })
      .addCase(getProdi.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(createProdi.pending, state => {
        state.isLoading = true;
      })
      .addCase(createProdi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prodi.push(action.payload);
      })

      .addCase(updateProdi.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateProdi.fulfilled, state => {
        state.isLoading = false;
      })

      .addCase(deleteProdi.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteProdi.fulfilled, (state, action) => {
        state.isLoading = false;
        state.prodi = state.prodi.filter(p => p.id !== action.payload);
      })

      // ===== JADWAL
      .addCase(getJadwal.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJadwal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jadwal = action.payload;
      })

      .addCase(createJadwal.pending, state => {
        state.isLoading = true;
      })
      .addCase(createJadwal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jadwal.push(action.payload);
      });
  },
});

export const {
  reducer: adminReducer,
  actions: { resetAdminState },
} = adminSlice;