import React from 'react';
import DefaultLayout from '../../shared/ui/Layout/DefaultLayout';
import { BookListContainer } from '../../features/BookList/BookListContainer';
import { useNavigate } from 'react-router-dom';
import Button from '../../shared/ui/Button/Button';

const BookListPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToRegistration = () => {
    navigate('/books/new');
  };

  return (
    <DefaultLayout>
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">도서 목록</h1>
          <Button onClick={handleGoToRegistration}>도서 등록</Button>
        </div>
        <BookListContainer />
      </main>
    </DefaultLayout>
  );
};

export default BookListPage;
