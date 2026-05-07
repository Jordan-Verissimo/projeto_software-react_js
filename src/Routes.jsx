import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import App from './App';
import FirstAccess from './pages/FirstAccess';
import Refils from './pages/Refils';
import NeuroSync from './pages/NeuroSync';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import Device from './pages/Device';
import Hardware from './pages/Hardware';
import Faculties from './pages/admin/Faculties';
import Quiz from './pages/Quiz';
import Slides from './pages/Slides';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'quiz', element: <Quiz /> },
      { path: 'first-access', element: <FirstAccess /> },
      { path: 'hardware', element: <Hardware /> },
      { path: 'refils', element: <Refils /> },
      { path: 'neuro-sync', element: <NeuroSync /> },
      { path: 'marketplace', element: <Marketplace /> },
      { path: 'device', element: <Device /> },
      { path: 'slides', element: <Slides /> },
      { path: 'admin/faculties', element: <Faculties /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
