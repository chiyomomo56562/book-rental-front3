import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BookListPage from '../../pages/BookList/BookListPage';
import BookDetailPage from '../../pages/BookDetail/BookDetailPage';
import BookRegistrationPage from '../../pages/BookRegistration/BookRegistrationPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BookListPage />,
  },
  {
    path: '/books/new',
    element: <BookRegistrationPage />,
  },
  {
    path: '/books/:id',
    element: <BookDetailPage />,
  },
]);

export const AppRouterProvider: React.FC = () => {
  return <RouterProvider router={router} />;
};
