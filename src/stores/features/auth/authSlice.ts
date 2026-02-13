/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'sonner';
import type { AuthState, LoginPayload, LoginPendaftarPayload, RegisterPendaftarPayload } from './type';
import { API_URL } from '../../../constants';
import { getProfile } from '../pendaftar';

const initialState: AuthState = {
  isLoading: false,
  isAuthenticated: false,
  role: null,
  accessToken: null,
  error: null,
};

// ADMIN / STAFF LOGIN
export const loginAdmin = createAsyncThunk(
  'auth/loginAdmin',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/admin/login`, payload);
      toast.success(response.data?.msg || 'Login berhasil');

      const { accessToken, role } = response.data;

      sessionStorage.setItem(
        'accessToken', accessToken
      );
      sessionStorage.setItem(
        'role', role
      );

      return { accessToken, role };
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Login gagal');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// PENDAFTAR REGISTER
export const registerPendaftar = createAsyncThunk(
  'auth/registerPendaftar',
  async (payload: RegisterPendaftarPayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/pendaftar/register`, payload);
      toast.success(response.data?.msg || 'Pendaftaran berhasil');
      return response.data;
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Register gagal');
      return rejectWithValue(error.response?.data?.msg);
    }
  },
);

// PENDAFTAR LOGIN
export const loginPendaftar = createAsyncThunk(
  'auth/loginPendaftar',
  async (payload: LoginPendaftarPayload, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/pendaftar/login`,
        payload
      );
      toast.success(response.data?.msg || 'Login berhasil');

      const { accessToken, role, nomor_pendaftaran } = response.data;

      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('role', role);
      sessionStorage.setItem('nomor_pendaftaran', nomor_pendaftaran);
      dispatch(getProfile());

      return { accessToken, role };
    } catch (error: any) {
      toast.error(error.response?.data?.msg || 'Login gagal');
      return rejectWithValue(error.response?.data?.msg);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.role = null;
      localStorage.removeItem('auth');
    },
    loadAuthFromStorage: state => {
      const auth = JSON.parse(localStorage.getItem('auth') || '{}');
      if (auth?.accessToken) {
        state.isAuthenticated = true;
        state.accessToken = auth.accessToken;
        state.role = auth.role;
      }
    },
  },
  extraReducers: builder => {
    builder
      // ===== LOGIN (ADMIN & PENDAFTAR)
      .addCase(loginAdmin.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
      })
      .addCase(loginAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(loginPendaftar.pending, state => {
        state.isLoading = true;
      })
      .addCase(loginPendaftar.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.accessToken = action.payload.accessToken;
        state.role = action.payload.role;
      })
      .addCase(loginPendaftar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      // ===== REGISTER PENDAFTAR
      .addCase(registerPendaftar.pending, state => {
        state.isLoading = true;
      })
      .addCase(registerPendaftar.fulfilled, state => {
        state.isLoading = false;
      })
      .addCase(registerPendaftar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  reducer: authReducer,
  actions: { logout, loadAuthFromStorage },
} = authSlice;

