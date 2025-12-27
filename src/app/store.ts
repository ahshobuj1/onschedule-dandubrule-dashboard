// src/app/store.ts
import {configureStore} from '@reduxjs/toolkit';
// import authReducer from '@/features/auth/authSlice';
import {userApi} from '@/features/users/userApi';
import {clientApi} from '@/features/client/clientApi';
import {plansApi} from './../features/plans/plansApi';
import {employeesApi} from '@/features/employees/employeesApi';

import {coursesApi} from '@/features/courses/coursesApi';
import {modulesApi} from '@/features/modules/modulesApi';
import {transactionsApi} from '@/features/transactions/transactionsApi';
import {certificateApi} from '@/features/certificate/certificateApi';
import {contentApi} from '@/features/content/contentApi';
import {statsApi} from '@/features/stats/statsApi';
import {assignmentApi} from '@/features/assignment/assignmentApi'; // ✨ Import

import {
  // persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// import storage from 'redux-persist/lib/storage';
// import {persistReducer} from 'redux-persist';

// const persistConfig = {
//   key: 'auth',
//   storage,
// };

// const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    // auth: persistedAuthReducer,
    // [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [clientApi.reducerPath]: clientApi.reducer,
    [plansApi.reducerPath]: plansApi.reducer,
    [employeesApi.reducerPath]: employeesApi.reducer,

    [coursesApi.reducerPath]: coursesApi.reducer,
    [modulesApi.reducerPath]: modulesApi.reducer,
    [contentApi.reducerPath]: contentApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [assignmentApi.reducerPath]: assignmentApi.reducer,
    [certificateApi.reducerPath]: certificateApi.reducer, // ✨ Add reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat([
      // authApi.middleware,
      userApi.middleware,
      clientApi.middleware,
      plansApi.middleware,
      employeesApi.middleware,

      coursesApi.middleware,
      modulesApi.middleware,
      contentApi.middleware,
      transactionsApi.middleware,
      certificateApi.middleware,
      assignmentApi.middleware,
      statsApi.middleware, // ✨ Add middleware
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
// export const persistor = persistStore(store);
