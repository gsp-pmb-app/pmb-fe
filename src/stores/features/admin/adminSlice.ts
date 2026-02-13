/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../../../constants';
import { getAuthHeader } from '../../../utils/auth';
import type { AdminState } from './type';

const initialState: AdminState = {
  prodi:{
    data: [],
    isLoading: false,
    error: null
  },
  ruangan: {
    data: [],
    isLoading: false,
    error: null
  },
  jadwal: {
    data: [],
    isLoading: false,
    error: null
  }
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
// CREATE RUANGAN
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

// GET RUANGAN
export const getRuangan = createAsyncThunk(
  'admin/getRuangan',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/admin/ruangan`,
        getAuthHeader(),
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal mengambil ruangan');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// UPDATE RUANGAN
export const updateRuangan = createAsyncThunk(
  'admin/updateRuangan',
  async (
    {
      id,
      nama_ruangan,
      kapasitas,
      lokasi,
    }: {
      id: number;
      nama_ruangan: string;
      kapasitas: number;
      lokasi: string;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.put(
        `${API_URL}/admin/ruangan/${id}`,
        { nama_ruangan, kapasitas, lokasi },
        getAuthHeader(),
      );

      toast.success('Ruangan berhasil diupdate');
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal update ruangan');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// DELETE RUANGAN
export const deleteRuangan = createAsyncThunk(
  'admin/deleteRuangan',
  async (id: number, { rejectWithValue }) => {
    try {
      await axios.delete(
        `${API_URL}/admin/ruangan/${id}`,
        getAuthHeader(),
      );

      toast.success('Ruangan berhasil dihapus');
      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal menghapus ruangan');
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

// UPDATE JADWAL
export const updateJadwal = createAsyncThunk(
  'admin/updateJadwal',
  async (
    {
      id,
      tanggal,
      sesi,
      kuota,
      ruanganId,
      prodiId,
    }: {
      id: number;
      tanggal: string;
      sesi: string;
      kuota: number;
      ruanganId: number;
      prodiId: number;
    },
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.put(
        `${API_URL}/admin/jadwal/${id}`,
        { tanggal, sesi, kuota, ruanganId, prodiId },
        getAuthHeader(),
      );

      toast.success(res.data?.msg || 'Jadwal berhasil diupdate');

      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal update jadwal');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);


// DELETE JADWAL
export const deleteJadwal = createAsyncThunk(
  'admin/deleteJadwal',
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${API_URL}/admin/jadwal/${id}`,
        getAuthHeader(),
      );

      toast.success(res.data?.msg || 'Jadwal berhasil dihapus');

      return id;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal menghapus jadwal');
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
      state.prodi = {
        data: [],
        isLoading: false,
        error: null
      };
      state.ruangan = {
        data: [],
        isLoading: false,
        error: null
      };
      state.jadwal = {
        data: [],
        isLoading: false,
        error: null
      };
    },
  },
  extraReducers: builder => {
    builder
      // ===== PRODI
      .addCase(getProdi.pending, state => {
        state.prodi.isLoading = true;
      })
      .addCase(getProdi.fulfilled, (state, action) => {
        state.prodi.isLoading = false;
        state.prodi.data = action.payload;
      })
      .addCase(getProdi.rejected, (state, action) => {
        state.prodi.isLoading = false;
        state.prodi.error = action.payload as string;
      })

      .addCase(createProdi.pending, state => {
        state.prodi.isLoading = true;
      })
      .addCase(createProdi.fulfilled, (state, action) => {
        state.prodi.isLoading = false;
        state.prodi.data.push(action.payload);
      })
      .addCase(createProdi.rejected, (state, action) => {
        state.prodi.isLoading = false;
        state.prodi.error = action.payload as string;
      })

      .addCase(updateProdi.pending, state => {
        state.prodi.isLoading = true;
      })
      .addCase(updateProdi.fulfilled, state => {
        state.prodi.isLoading = false;
      })
      .addCase(updateProdi.rejected, (state, action) => {
        state.prodi.isLoading = false;
        state.prodi.error = action.payload as string;
      })

      .addCase(deleteProdi.pending, state => {
        state.prodi.isLoading = true;
      })
      .addCase(deleteProdi.fulfilled, (state, action) => {
        state.prodi.isLoading = false;
        state.prodi.data = state.prodi.data.filter(p => p.id !== action.payload);
      })
      .addCase(deleteProdi.rejected, (state, action) => {
        state.prodi.isLoading = false;
        state.prodi.error = action.payload as string;
      })

      // ===== RUANGAN
      .addCase(getRuangan.pending, state => {
        state.ruangan.isLoading = true;
      })
      .addCase(getRuangan.fulfilled, (state, action) => {
        state.ruangan.isLoading = false;
        state.ruangan.data = action.payload;
      })
      .addCase(getRuangan.rejected, (state, action) => {
        state.ruangan.isLoading = false;
        state.ruangan.error = action.payload as string;
      })

      .addCase(createRuangan.pending, state => {
        state.ruangan.isLoading = true;
      })
      .addCase(createRuangan.fulfilled, (state, action) => {
        state.ruangan.isLoading = false;
        state.ruangan.data.push(action.payload);
      })
      .addCase(createRuangan.rejected, (state, action) => {
        state.ruangan.isLoading = false;
        state.ruangan.error = action.payload as string;
      })

      .addCase(updateRuangan.pending, state => {
        state.ruangan.isLoading = true;
      })
      .addCase(updateRuangan.fulfilled, (state, action) => {
        state.ruangan.isLoading = false;

        const index = state.ruangan.data.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.ruangan.data[index] = action.payload;
        }
      })
      .addCase(updateRuangan.rejected, (state, action) => {
        state.ruangan.isLoading = false;
        state.ruangan.error = action.payload as string;
      })

      .addCase(deleteRuangan.pending, state => {
        state.ruangan.isLoading = true;
      })
      .addCase(deleteRuangan.fulfilled, (state, action) => {
        state.ruangan.isLoading = false;
        state.ruangan.data = state.ruangan.data.filter(r => r.id !== action.payload);
      })
      .addCase(deleteRuangan.rejected, (state, action) => {
        state.ruangan.isLoading = false;
        state.ruangan.error = action.payload as string;
      })

      // ===== JADWAL
      .addCase(getJadwal.pending, state => {
        state.jadwal.isLoading = true;
      })
      .addCase(getJadwal.fulfilled, (state, action) => {
        state.jadwal.isLoading = false;
        state.jadwal.data = action.payload;
      })
      .addCase(getJadwal.rejected, (state, action) => {
        state.jadwal.isLoading = false;
        state.jadwal.error = action.payload as string;
      })

      .addCase(createJadwal.pending, state => {
        state.jadwal.isLoading = true;
      })
      .addCase(createJadwal.fulfilled, (state, action) => {
        state.jadwal.isLoading = false;
        state.jadwal.data.push(action.payload);
      })
      .addCase(createJadwal.rejected, (state, action) => {
        state.jadwal.isLoading = false;
        state.jadwal.error = action.payload as string;
      })

      .addCase(updateJadwal.pending, state => {
        state.jadwal.isLoading = true;
      })
      .addCase(updateJadwal.fulfilled, (state, action) => {
        state.jadwal.isLoading = false;

        const index = state.jadwal.data.findIndex(r => r.id === action.payload.id);
        if (index !== -1) {
          state.jadwal.data[index] = action.payload;
        }
      })
      .addCase(updateJadwal.rejected, (state, action) => {
        state.jadwal.isLoading = false;
        state.jadwal.error = action.payload as string;
      })

      .addCase(deleteJadwal.pending, state => {
        state.jadwal.isLoading = true;
      })
      .addCase(deleteJadwal.fulfilled, (state, action) => {
        state.jadwal.isLoading = false;
        state.jadwal.data = state.jadwal.data.filter(j => j.id !== action.payload);
      })
      .addCase(deleteJadwal.rejected, (state, action) => {
        state.jadwal.isLoading = false;
        state.jadwal.error = action.payload as string;
      })
  },
});

export const {
  reducer: adminReducer,
  actions: { resetAdminState },
} = adminSlice;