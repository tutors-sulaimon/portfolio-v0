import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Root from './routes/Root';
import ErrorPage from './routes/ErrorPage';
import Projects from './routes/Projects';
import About from './routes/About';
import Resume from './routes/Resume';
import Home from './routes/Home';
import BlogPostList from './routes/blog/BlogPostList';
import BlogPostDetail from './routes/blog/BlogPostDetail';
import CreateBlogPost from './routes/blog/CreateBlogPost';

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
      { path: '/blog', element: <BlogPostList /> },
      { path: '/blog/:documentId', element: <BlogPostDetail /> },
      { path: '/blog/create', element: <CreateBlogPost /> },
    ],
  },
]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
