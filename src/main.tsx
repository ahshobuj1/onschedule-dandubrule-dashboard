import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import {RouterProvider} from 'react-router/dom';
import router from './app/router.tsx';
import {Provider} from 'react-redux';
import {store} from './app/store.ts';
// import {PersistGate} from 'redux-persist/integration/react';
import {Toaster} from 'sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <Toaster position="top-center" />

      <RouterProvider router={router} />
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>
);
