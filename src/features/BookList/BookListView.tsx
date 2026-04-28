import React from 'react';
import Card from '../../shared/ui/Card/Card';
import Badge from '../../shared/ui/Badge/Badge';
import Button from '../../shared/ui/Button/Button';
import { BookViewModel } from './types';

interface BookListViewProps {
  books: BookViewModel[];
  isLoading: boolean;
  isError: boolean;
  onNavigateDetail: (id: string) => void;
  onRetry: () => void;
}

export const BookListView: React.FC<BookListViewProps> = ({
  books,
  isLoading,
  isError,
  onNavigateDetail,
  onRetry,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg" />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-600 mb-4">도서 목록을 불러오는 중 오류가 발생했습니다.</p>
        <Button onClick={onRetry}>다시 시도</Button>
      </div>
    );
  }

  if (books.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-4">등록된 도서가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {books.map((book) => (
        <div
          key={book.id}
          role="button"
          tabIndex={0}
          onClick={() => onNavigateDetail(book.id)}
          onKeyDown={(e) => e.key === 'Enter' && onNavigateDetail(book.id)}
          className="cursor-pointer transition-transform hover:scale-[1.02]"
        >
          <Card
            className={!book.isRentable ? 'opacity-60' : ''}
          >
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold text-gray-900 truncate mr-2">
                {book.title}
              </h3>
              <Badge variant={book.statusColor === 'green' ? 'success' : 'danger'}>
                {book.statusText}
              </Badge>
            </div>
          </Card>
        </div>
      ))}
    </div>
  );
};
