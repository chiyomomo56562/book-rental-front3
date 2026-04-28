import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../shared/ui/Layout/DefaultLayout';
import { BookDetailContainer } from '../../features/BookDetail/BookDetailContainer';
import { BookManagementContainer } from '../../features/BookManagement/BookManagementContainer';
import { RentalHistoryContainer } from '../../features/RentalHistory/RentalHistoryContainer';
import { useBookDetail } from '../../features/BookDetail/hooks/useBookDetail';
import Button from '../../shared/ui/Button/Button';

const BookDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book } = useBookDetail(id ?? '');

  const handleBackToList = () => {
    navigate('/');
  };

  return (
    <DefaultLayout>
      <main className="container mx-auto p-4 space-y-8">
        <div className="flex justify-start mb-4">
          <Button variant="outline" onClick={handleBackToList}>목록으로</Button>
        </div>

        <section>
          <BookDetailContainer />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            {book && id && (
              <BookManagementContainer bookId={id} currentTitle={book.title} />
            )}
          </div>
          <div>
            {id && <RentalHistoryContainer bookId={id} />}
          </div>
        </section>
      </main>
    </DefaultLayout>
  );
};

export default BookDetailPage;
