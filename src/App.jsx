import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from './components/Layout/MainLayout';
import Home from './pages/Home';
import FetchOld from './pages/FetchOld';
import FetchRQ from './pages/FetchRQ';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import FetchIndv from './components/UI/FetchIndv';
import InfiniteScroll from './pages/InfiniteScroll';

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/infinite-scrolling-with-tanstack/",
        element: <Home />
      },
      {
        path: "/infinite-scrolling-with-tanstack/trad",
        element: <FetchOld />
      },
      {
        path: "/infinite-scrolling-with-tanstack/rq",
        element: <FetchRQ />
      },
      {
        path: "/infinite-scrolling-with-tanstack/rq/:id",
        element: <FetchIndv />,
      },
      {
        path: "/infinite-scrolling-with-tanstack/infinite",
        element: <InfiniteScroll />,
      },
    ]
  }
]);

const App = () => {

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <RouterProvider router={router}>
      </RouterProvider>
    </QueryClientProvider>
  )
}

export default App