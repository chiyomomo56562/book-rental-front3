import React from 'react';
import { useNavigate } from 'react-router-dom';
import DefaultLayout from '../../shared/ui/Layout/DefaultLayout';
import BookRegistrationContainer from '../../features/BookRegistration/BookRegistrationContainer';
import Button from '../../shared/ui/Button/Button';

const BookRegistrationPage: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <DefaultLayout>
      <main className="container mx-auto p-4">
        <div className="max-w-lg mx-auto">
          <div className="flex justify-start mb-6">
            <Button variant="outline" onClick={handleBack}>목록으로</Button>
          </div>
          <h1 className="text-2xl font-bold mb-6">새로운 도서 등록</h1>
          <BookRegistrationContainer />
        </div>
      </main>
    </DefaultLayout>
  );
};

export default BookRegistrationPage;
