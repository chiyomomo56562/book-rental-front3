import React from 'react';
import BookRegistrationView from './BookRegistrationView';
import { useCreateBook } from './hooks/useCreateBook';
import { RegistrationFormValues } from './types';

const BookRegistrationContainer: React.FC = () => {
  const { mutate, isPending, error } = useCreateBook();

  const handleSubmit = (values: RegistrationFormValues) => {
    mutate(values);
  };

  const serverError = error instanceof Error ? error.message : undefined;

  return (
    <BookRegistrationView
      onSubmit={handleSubmit}
      isLoading={isPending}
      serverError={serverError}
    />
  );
};

export default BookRegistrationContainer;
