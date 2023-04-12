import React from 'react';
import HomePage from './pages/HomePage';
import { QueryClient, QueryClientProvider } from 'react-query';
import 'react-loading-skeleton/dist/skeleton.css';
import AudioProvider from './contexts/AudioContext';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';
import routes from './routes';
import AuthProvider from './contexts/AuthContext';

interface IProps {}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC<IProps> = () => {
  console.log('Nghe nhạc vui vẻ');

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AuthProvider>
            <AudioProvider>
              <RouterProvider router={routes} />
            </AudioProvider>
            <Toaster
              position={'top-right'}
              toastOptions={{
                duration: 3000,
              }}
            />
          </AuthProvider>
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
