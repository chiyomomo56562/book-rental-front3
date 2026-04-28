import { RawBook, BookViewModel } from './types';

export const mapBookToViewModel = (book: RawBook): BookViewModel => {
  const isAvailable = book.status === 'AVAILABLE';
  
  return {
    id: book.id,
    title: book.title,
    statusText: isAvailable ? '대여 가능' : '대여 중',
    isRentable: isAvailable,
    statusColor: isAvailable ? 'green' : 'red',
  };
};

export const mapBookListToViewModel = (books: RawBook[]): BookViewModel[] => {
  return books.map(mapBookToViewModel);
};
