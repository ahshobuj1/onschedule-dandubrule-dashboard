// src/features/auth/authSlice.ts
import type {TUser} from '@/pages/Users/type';
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  role: string | null;
  userId: string | null;
  user: TUser | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: Boolean(localStorage.getItem('token')),
  isLoading: false,
  role: null,
  userId: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{token: string; user: TUser}>
    ) => {
      console.log('action payload', action.payload);

      const {token, user} = action.payload;
      state.token = token;
      state.isAuthenticated = true;
      state.user = user;

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        state.role = decoded.role; // store role
        state.userId = decoded.id;
      } catch (err) {
        console.error('JWT decode error', err);
      }

      localStorage.setItem('token', token);
    },

    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.role = null;
      state.userId = null;
      state.user = null;
      localStorage.removeItem('token');
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setCredentials, logout, setLoading} = authSlice.actions;
export default authSlice.reducer;
