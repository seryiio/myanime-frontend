import React from 'react'
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
        path: 'crud/animes', element: <CrudAnime />
      },
      {
        path: 'crud/animes/:id', element: <CrudSeasonbA />
      },
      {
        path: 'crud/seasons', element: <CrudSeason />
      },
      {
        path: 'animes/:id', element: <AnimeData />
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
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
