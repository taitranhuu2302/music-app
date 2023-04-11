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

interface IProps {}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC<IProps> = () => {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <RouterProvider router={routes} />
          <Toaster
            position={'top-right'}
            toastOptions={{
              duration: 3000,
            }}
          />
        </Provider>
      </QueryClientProvider>
    </>
  );
};

export default App;
