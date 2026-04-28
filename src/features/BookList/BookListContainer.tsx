import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookList } from './hooks/useBookList';
import { BookListView } from './BookListView';

export const BookListContainer: React.FC = () => {
  const navigate = useNavigate();
  const { data: books, isLoading, isError, refetch } = useBookList();

  const handleNavigateDetail = (id: string) => {
    navigate(`/books/${id}`);
  };

  const handleRetry = () => {
    refetch();
  };

  return (
    <BookListView
      books={books ?? []}
      isLoading={isLoading}
      isError={isError}
      onNavigateDetail={handleNavigateDetail}
      onRetry={handleRetry}
    />
  );
};
