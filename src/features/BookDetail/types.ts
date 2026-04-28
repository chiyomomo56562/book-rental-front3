export type BookStatus = 'AVAILABLE' | 'RENTED';

export interface RawBookDetail {
  id: string;
  title: string;
  status: BookStatus;
}

export interface BookDetailViewModel {
  id: string;
  title: string;
  statusLabel: string;
  actionButtonText: '대여하기' | '반납하기';
  canRent: boolean;
  canReturn: boolean;
}
