// src/features/auth/authSlice.ts
import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  userId: string;
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
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: Boolean(localStorage.getItem('token')),
  isLoading: false,
  role: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{token: string}>) => {
      const {token} = action.payload;
      state.token = token;
      state.isAuthenticated = true;

      try {
        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        state.role = decoded.role; // store role
        state.userId = decoded.userId;
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
      localStorage.removeItem('token');
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {setCredentials, logout, setLoading} = authSlice.actions;
export default authSlice.reducer;
