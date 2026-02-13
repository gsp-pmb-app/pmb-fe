/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import { API_URL } from '../../../constants';
import type { PublicState } from './type';

const initialState: PublicState = {
  isLoading: false,
  checkStatus: null,
  error: null,
};

export const checkKelulusan = createAsyncThunk(
  "public/checkKelulusan",
  async (
    payload: {
      nomor_pendaftaran: string;
      tanggal_lahir: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const res = await axios.post(
        `${API_URL}/check-kelulusan`,
        payload
      );

      return res.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.msg ||
          "Data tidak ditemukan. Periksa kembali input Anda."
      );
      return rejectWithValue(
        error.response?.data?.msg || "Gagal cek kelulusan"
      );
    }
  }
);


const publicSlice = createSlice({
  name: "public",
  initialState,
  reducers: {
    resetCheckStatus: (state) => {
      state.checkStatus = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkKelulusan.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkKelulusan.fulfilled, (state, action) => {
        state.isLoading = false;
        state.checkStatus = action.payload;
      })
      .addCase(checkKelulusan.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.checkStatus = null;
      });
  },
});

export const {
  reducer: publicDataReducer,
  actions: { resetCheckStatus },
} = publicSlice;


