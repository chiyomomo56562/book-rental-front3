import { useQuery } from '@tanstack/react-query';
import { getRentalHistory } from '../api';
import { mapRentalHistory } from '../mapper';

export const useRentalHistory = (bookId: string) => {
  return useQuery({
    queryKey: ['books', 'rentals', bookId],
    queryFn: async () => {
      const response = await getRentalHistory(bookId);
      return response.data.map(mapRentalHistory);
    },
    enabled: !!bookId,
  });
};
