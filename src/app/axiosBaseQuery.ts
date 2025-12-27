// src/app/axiosBaseQuery.ts
import axios, {
  type AxiosProgressEvent,
  type AxiosRequestConfig,
  AxiosError,
} from 'axios';
import {type BaseQueryFn} from '@reduxjs/toolkit/query/react';
// import {store} from './store';
// import {logout} from '@/features/auth/authSlice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {'Content-Type': 'application/json'},
  timeout: 10000,
  withCredentials: true,
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export interface AxiosRequest<TData = unknown> {
  url: string;
  method: AxiosRequestConfig['method'];
  data?: TData | FormData | File;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;

  onUploadProgress?: (progressEvent: AxiosProgressEvent) => void;
}

export const axiosBaseQuery =
  <TData = unknown>(): BaseQueryFn<AxiosRequest<TData>, unknown, unknown> =>
  async ({url, method, data, params, headers, onUploadProgress}) => {
    try {
      const result = await axiosInstance({
        url,
        method,
        data,
        params,
        headers,
        onUploadProgress,
      });
      return {data: result.data as TData};
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const error = err as AxiosError<any>;
      const status = error.response?.status;
      const message = error.response?.data?.message;
      const errorName = error.response?.data?.error?.name;

      const isTokenExpired =
        status === 401 ||
        message === 'jwt expired' ||
        errorName === 'TokenExpiredError';

      if (isTokenExpired) {
        // store.dispatch(logout());
      }
      return {
        error: {
          status: error.response?.status,
          data: error.response?.data || error.message,
        },
      };
    }
  };
