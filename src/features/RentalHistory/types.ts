export interface RawRentalHistory {
  id: string;
  bookId: string;
  rentedAt: string;
  returnedAt: string | null;
}

export interface RentalHistoryViewModel {
  id: string;
  rentedDateText: string;
  returnedDateText: string;
  isCurrentlyRented: boolean;
}
