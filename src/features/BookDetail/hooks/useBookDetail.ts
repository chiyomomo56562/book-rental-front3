import { useQuery } from '@tanstack/react-query';
import { getBookDetail } from '../api';
import { mapToBookDetailViewModel } from '../mapper';

export const useBookDetail = (id: string) => {
  return useQuery({
    queryKey: ['books', 'detail', id],
    queryFn: async () => {
      const data = await getBookDetail(id);
      return mapToBookDetailViewModel(data);
    },
    enabled: !!id,
  });
};
