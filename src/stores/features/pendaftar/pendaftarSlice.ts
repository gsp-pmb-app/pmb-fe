/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../../../constants';
import type { PendaftarState } from './type';
import { getAuthHeader } from '../../../utils/auth';

const initialState: PendaftarState = {
  isLoading: false,
  profile: null,
  jadwal: null,
  kartuUjian: null,
  status: null,
  error: null,
  errorUpload: null,
  isLoadingUpload: false,
};

// GET PROFILE
export const getProfile = createAsyncThunk(
  "pendaftar/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/pendaftar/profile`,
        getAuthHeader(),
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || "Gagal mengambil profil");
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
  'pendaftar/updateProfile',
  async (payload: any, { rejectWithValue }) => {
    try {
      const res = await axios.patch(
        `${API_URL}/pendaftar/profile`,
        payload,
        getAuthHeader(),
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal update profil');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// UPLOAD DOKUMEN & FOTO
export const uploadDokumen = createAsyncThunk(
  'pendaftar/uploadDokumen',
  async (formData: FormData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/pendaftar/dokumen`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Upload dokumen gagal');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// GET JADWAL UJIAN
export const getJadwalUjian = createAsyncThunk(
  'pendaftar/getJadwalUjian',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/pendaftar/jadwal`,
        getAuthHeader(),
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal mengambil jadwal ujian');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// GET KARTU UJIAN
export const getKartuUjian = createAsyncThunk(
  'pendaftar/getKartuUjian',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/pendaftar/kartu-ujian`,
        getAuthHeader(),
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal mengambil kartu ujian');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// GET STATUS KELULUSAN
export const getStatusPendaftar = createAsyncThunk(
  'pendaftar/getStatus',
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/pendaftar/status`,
        getAuthHeader(),
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal mengambil status');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

const pendaftarSlice = createSlice({
  name: 'pendaftar',
  initialState,
  reducers: {
    resetPendaftarState: state => {
      state.profile = null;
      state.jadwal = null;
      state.kartuUjian = null;
      state.status = null;
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      // ===== GET PROFILE
      .addCase(getProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===== UPDATE PROFILE
      .addCase(updateProfile.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===== UPLOAD DOKUMEN
      .addCase(uploadDokumen.pending, state => {
        state.isLoadingUpload = true;
      })
      .addCase(uploadDokumen.fulfilled, state => {
        state.isLoadingUpload = false;
      })
      .addCase(uploadDokumen.rejected, (state, action) => {
        state.isLoadingUpload = false;
        state.errorUpload = action.payload as string;
      })

      // ===== JADWAL
      .addCase(getJadwalUjian.pending, state => {
        state.isLoading = true;
      })
      .addCase(getJadwalUjian.fulfilled, (state, action) => {
        state.isLoading = false;
        state.jadwal = action.payload;
      })

      // ===== KARTU UJIAN
      .addCase(getKartuUjian.pending, state => {
        state.isLoading = true;
      })
      .addCase(getKartuUjian.fulfilled, (state, action) => {
        state.isLoading = false;
        state.kartuUjian = action.payload;
      })

      // ===== STATUS
      .addCase(getStatusPendaftar.pending, state => {
        state.isLoading = true;
      })
      .addCase(getStatusPendaftar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = action.payload;
      });
  },
});

export const {
  reducer: pendaftarReducer,
  actions: { resetPendaftarState },
} = pendaftarSlice;