import { RawBookDetail, BookDetailViewModel } from './types';

export const mapToBookDetailViewModel = (raw: RawBookDetail): BookDetailViewModel => {
  const isAvailable = raw.status === 'AVAILABLE';

  return {
    id: raw.id,
    title: raw.title,
    statusLabel: isAvailable ? '현재 대여 가능' : '현재 대여 중',
    actionButtonText: isAvailable ? '대여하기' : '반납하기',
    canRent: isAvailable,
    canReturn: !isAvailable,
  };
};
