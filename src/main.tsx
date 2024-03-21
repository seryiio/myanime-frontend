import ReactDOM from 'react-dom/client'
import '@fontsource-variable/baloo-2';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.scss'

import App from './App.tsx'
import Home from './pages/home/Home.tsx';
import Crud from './pages/crud/Crud.tsx';
import CrudGenre from './pages/crud/genres/CrudGenre.tsx';
import CrudAnime from './pages/crud/animes/CrudAnimes.tsx';
import Login from './pages/login/Login.tsx';
import AnimeData from './pages/animeData/AnimeData.tsx';
import Register from './pages/register/Register.tsx';
import CrudSeason from './pages/crud/seasons/CrudSeason.tsx';
import CrudSeasonbA from './pages/crud/seasons/CrudSeasonbA.tsx';
import CrudEpisodesbS from './pages/crud/episodes/CrudEpisodesbS.tsx';
import { NextUIProvider } from '@nextui-org/react';
import SeasonData from './pages/seasonData/SeasonData.tsx';
import CrudSong from './pages/crud/songs/CrudSong.tsx';
import ListGenres from './pages/genre/ListGenres.tsx';
import CrudBook from './pages/crud/books/CrudBook.tsx';
import CrudAnimebB from './pages/crud/animes/CrudAnimebB.tsx';
import ListAnimesByGenre from './pages/anime/ListAnimesByGenre.tsx';
import ListBooksByGenre from './pages/book/ListBooksByGenre.tsx';

import AuthProvider from "react-auth-kit";
import RequireAuth from '@auth-kit/react-router/RequireAuth'
import createStore from 'react-auth-kit/createStore';
import MyList from './pages/myList/MyList.tsx';
import ProtectedRoute from './components/routes/ProtectedRoute.tsx';

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'https:'
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'crud', element:
          <ProtectedRoute><Crud /></ProtectedRoute>,
      },
      {
        path: 'crud/genres', element: <ProtectedRoute><CrudGenre /></ProtectedRoute>,
      },
      {
        path: 'crud/books', element: <ProtectedRoute><CrudBook /></ProtectedRoute>,
      },
      {
        path: 'crud/animes', element: <ProtectedRoute><CrudAnime /></ProtectedRoute>,
      },
      {
        path: 'crud/books/:id/animes', element: <ProtectedRoute><CrudAnimebB /></ProtectedRoute>,
      },
      {
        path: 'crud/animes/:id/seasons', element: <ProtectedRoute><CrudSeasonbA /></ProtectedRoute>,
      },
      {
        path: 'crud/animes/:id/seasons/:idseason/episodes', element: <ProtectedRoute><CrudEpisodesbS /></ProtectedRoute>,
      },
      {
        path: 'crud/animes/:id/seasons/:idseason/songs', element: <ProtectedRoute> <CrudSong /></ProtectedRoute>,
      },
      {
        path: 'crud/seasons', element: <ProtectedRoute><CrudSeason /></ProtectedRoute>,
      },
      {
        path: 'genres', element: <ListGenres />
      },
      {
        path: 'genres/:id/animes', element: <ListAnimesByGenre />
      },
      {
        path: 'genres/:id/books', element: <ListBooksByGenre />
      },
      {
        path: 'animes/:id', element: <AnimeData />
      },
      {
        path: 'animes/:id/seasons/:idSeason', element: <SeasonData />
      },
      {
        path: 'myList', element: <RequireAuth fallbackPath={'/login'}><MyList /></RequireAuth>
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <NextUIProvider>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </NextUIProvider>,
)
