import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import AudioProvider from '../contexts/AudioContext';

const routes = createBrowserRouter([
  {
    path: '/',
    element: (
      <AudioProvider>
        <HomePage />
      </AudioProvider>
    ),
  },
]);

export default routes;
