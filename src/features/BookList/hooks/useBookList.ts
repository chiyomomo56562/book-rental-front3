import { useQuery } from '@tanstack/react-query';
import { getBooks } from '../api';
import { mapBookListToViewModel } from '../mapper';

export const useBookList = () => {
  return useQuery({
    queryKey: ['books', 'list'],
    queryFn: async () => {
      const { data } = await getBooks();
      return mapBookListToViewModel(data.data);
    },
  });
};
