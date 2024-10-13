import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import AppLayout from './layout/app-layout';
import Search from './pages/search';
import GifPage from './pages/single-gif';
import Category from './pages/category';
import Favorites from './pages/favorites';
import Home from './pages/home';
import GifProvider from './context/gif-context';
import NotFound from './pages/not-found';

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: "/search/:query", element: <Search /> },
      { path: "/gifs/:type/:slug", element: <GifPage /> }, // Path must match the Link
      { path: "/category/:category", element: <Category /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "*", element: <NotFound /> } // Catch-all for 404
    ],
  },
]);

function App() {
  return (
    <GifProvider>
      <RouterProvider router={router} />
    </GifProvider>
  );
}

export default App;
