import React from 'react';
import { BookDetailViewModel } from './types';
import Card from '../../shared/ui/Card/Card';
import Badge from '../../shared/ui/Badge/Badge';
import Button from '../../shared/ui/Button/Button';

interface BookDetailViewProps {
  book?: BookDetailViewModel;
  isLoading: boolean;
  isError: boolean;
  onRental: () => void;
  onReturn: () => void;
  isActionPending: boolean;
}

const BookDetailView: React.FC<BookDetailViewProps> = ({
  book,
  isLoading,
  isError,
  onRental,
  onReturn,
  isActionPending,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (isError || !book) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500 text-lg">도서 정보를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  const handleAction = () => {
    if (book.canRent) {
      onRental();
    } else if (book.canReturn) {
      onReturn();
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card title="도서 상세 정보">
        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500">제목</h3>
            <p className="mt-1 text-2xl font-bold text-gray-900">{book.title}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">상태</h3>
            <div className="mt-1">
              <Badge variant={book.canRent ? 'success' : 'danger'}>
                {book.statusLabel}
              </Badge>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100">
            <Button
              className="w-full"
              onClick={handleAction}
              isLoading={isActionPending}
              variant={book.canRent ? 'primary' : 'danger'}
            >
              {book.actionButtonText}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default BookDetailView;
