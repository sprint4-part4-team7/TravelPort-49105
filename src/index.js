import React from 'react';
import ReactDOM from 'react-dom/client';
import { CookiesProvider } from 'react-cookie';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './styles/global.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Flip, ToastContainer } from 'react-toastify';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60,
      gcTime: 1000 * 60 * 5,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <QueryClientProvider client={queryClient}>
    <CookiesProvider>
      <App />
    </CookiesProvider>
    <div style={{ fontSize: 16 }}>
      <ReactQueryDevtools initialIsOpen />
      <ToastContainer
        className="text-16 font-semibold"
        position="top-center"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        transition={Flip}
      />
    </div>
  </QueryClientProvider>,
);
