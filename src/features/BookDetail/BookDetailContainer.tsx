import React from 'react';
import { useParams } from 'react-router-dom';
import { useBookDetail } from './hooks/useBookDetail';
import { useRentalActions } from './hooks/useRentalActions';
import BookDetailView from './BookDetailView';

export const BookDetailContainer: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const { 
    data: book, 
    isLoading, 
    isError 
  } = useBookDetail(id ?? '');

  const { 
    rental, 
    return: returnBook, 
    isRentalPending, 
    isReturnPending 
  } = useRentalActions(id ?? '');

  const handleRental = () => {
    rental();
  };

  const handleReturn = () => {
    returnBook();
  };

  return (
    <BookDetailView
      book={book}
      isLoading={isLoading}
      isError={isError}
      onRental={handleRental}
      onReturn={handleReturn}
      isActionPending={isRentalPending || isReturnPending}
    />
  );
};
