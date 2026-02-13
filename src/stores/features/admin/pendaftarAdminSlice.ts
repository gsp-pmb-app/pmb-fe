/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../../../constants';
import { getAuthHeader } from '../../../utils/auth';
import type { PendaftarAdminState } from './type';

const initialState: PendaftarAdminState = {
list:{
    data: [],
    isLoading: false,
    error: null,
},
detail:{
    data: null,
    isLoading: false,
    error: null,
},
};

export const getAllPendaftar = createAsyncThunk(
  'pendaftarAdmin/getAllPendaftar',
  async (
    params: { page?: number; limit?: number; prodiId?: number } | undefined,
    { rejectWithValue },
  ) => {
    try {
      const res = await axios.get(
        `${API_URL}/pendaftar`,
        {
          ...getAuthHeader(),
          params,
        },
      );
      return res.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Gagal mengambil data pendaftar');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

export const getPendaftarById = createAsyncThunk(
  'pendaftarAdmin/getPendaftarById',
  async (nomor_pendaftaran: string, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${API_URL}/pendaftar/${nomor_pendaftaran}`,
        getAuthHeader(),
      );

      return res.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.msg || 'Gagal mengambil detail pendaftar',
      );
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);



const pendaftarAdminSlice = createSlice({
  name: 'pendaftarAdmin',
  initialState,
  reducers: {
    resetPendaftarAdminState: state => {
      state.list.data = [];
      state.list.isLoading = false;
      state.list.error = null;
      state.detail.data = null;
      state.detail.isLoading = false;
      state.detail.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllPendaftar.pending, state => {
        state.list.isLoading = true;
      })
      .addCase(getAllPendaftar.fulfilled, (state, action) => {
        state.list.isLoading = false;
        state.list.data = action.payload.data;
      })
      .addCase(getAllPendaftar.rejected, (state, action) => {
        state.list.isLoading = false;
        state.list.error = action.payload as string;
      })

      .addCase(getPendaftarById.pending, state => {
        state.detail.isLoading = true;
      })
      .addCase(getPendaftarById.fulfilled, (state, action) => {
        state.detail.isLoading = false;
        state.detail.data = action.payload;
      })
      .addCase(getPendaftarById.rejected, (state, action) => {
        state.detail.isLoading = false;
        state.detail.error = action.payload as string;
      });
  },
});

export const {
  reducer: pendaftarAdminReducer,
  actions: { resetPendaftarAdminState },
} = pendaftarAdminSlice;
