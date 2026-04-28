import { useMutation, useQueryClient } from '@tanstack/react-query';
import { rentalBook, returnBook } from '../api';

export const useRentalActions = (id: string) => {
  const queryClient = useQueryClient();

  const rentalMutation = useMutation({
    mutationFn: () => rentalBook(id),
    onSuccess: () => {
      console.log('대여 성공');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', id] });
    },
    onError: () => {
      console.error('대여 실패');
    },
  });

  const returnMutation = useMutation({
    mutationFn: () => returnBook(id),
    onSuccess: () => {
      console.log('반납 성공');
      queryClient.invalidateQueries({ queryKey: ['books'] });
      queryClient.invalidateQueries({ queryKey: ['books', 'detail', id] });
    },
    onError: () => {
      console.error('반납 실패');
    },
  });

  return {
    rental: rentalMutation.mutate,
    isRentalPending: rentalMutation.isPending,
    return: returnMutation.mutate,
    isReturnPending: returnMutation.isPending,
  };
};
