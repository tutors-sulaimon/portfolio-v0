import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import './App.css';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Projects from './routes/Projects';
import About from './routes/About';
import Resume from './routes/Resume';
import Home from './routes/Home';
import Blogs from './routes/Blogs';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: '/', element: <Navigate to="/home" replace /> },
        { path: '/home', element: <Home /> },
        { path: '/about', element: <About /> },
        { path: '/projects', element: <Projects /> },
        { path: '/resume', element: <Resume /> },
        { path: '/blogs', element: <Blogs /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
