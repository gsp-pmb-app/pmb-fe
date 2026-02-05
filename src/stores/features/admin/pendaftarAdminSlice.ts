/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../../../constants';
import { getAuthHeader } from '../../../utils/auth';
import type { PendaftarAdminState } from './type';

const initialState: PendaftarAdminState = {
  isLoading: false,
  data: [],
  error: null,
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


const pendaftarAdminSlice = createSlice({
  name: 'pendaftarAdmin',
  initialState,
  reducers: {
    resetPendaftarAdminState: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllPendaftar.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllPendaftar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(getAllPendaftar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  reducer: pendaftarAdminReducer,
  actions: { resetPendaftarAdminState },
} = pendaftarAdminSlice;
