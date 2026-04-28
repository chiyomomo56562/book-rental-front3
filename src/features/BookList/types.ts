export type BookStatus = 'AVAILABLE' | 'RENTED';

export interface RawBook {
  id: string;
  title: string;
  status: BookStatus;
}

export interface BookViewModel {
  id: string;
  title: string;
  statusText: '대여 가능' | '대여 중';
  isRentable: boolean;
  statusColor: 'green' | 'red';
}

export interface BookListResponse {
  status: number;
  data: RawBook[];
  error: string | null;
}
