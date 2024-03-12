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
import ListBooks from './pages/book/ListBooksByGenre.tsx';
import ListBooksByGenre from './pages/book/ListBooksByGenre.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      {
        path: 'crud', element: <Crud />,
      },
      {
        path: 'crud/genres', element: <CrudGenre />
      },
      {
        path: 'crud/books', element: <CrudBook />
      },
      {
        path: 'crud/animes', element: <CrudAnime />
      },
      {
        path: 'crud/books/:id/animes', element: <CrudAnimebB />
      },
      {
        path: 'crud/animes/:id/seasons', element: <CrudSeasonbA />
      },
      {
        path: 'crud/animes/:id/seasons/:idseason/episodes', element: <CrudEpisodesbS />
      },
      {
        path: 'crud/animes/:id/seasons/:idseason/songs', element: <CrudSong />
      },
      {
        path: 'crud/seasons', element: <CrudSeason />
      },
      {
        path: 'genres', element: <ListGenres />
      },
      {
        path: 'books', element: <ListBooks />
      },
      {
        path: 'genres/:id', element: <ListBooksByGenre />
      },
      {
        path: 'animes/:id', element: <AnimeData />
      },
      {
        path: 'animes/:id/seasons/:idSeason', element: <SeasonData />
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
    <RouterProvider router={router} />
  </NextUIProvider>,
)
