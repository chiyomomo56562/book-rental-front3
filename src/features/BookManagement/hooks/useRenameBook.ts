import { useMutation, useQueryClient } from '@tanstack/react-query';
import { renameTitle } from '../api';
import { mapManagementResponse } from '../mapper';

export const useRenameBook = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => renameTitle(id, { title }),
    onSuccess: (data) => {
      const isSuccess = mapManagementResponse(data);
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['books', id] });
        queryClient.invalidateQueries({ queryKey: ['books'] });
      }
    },
  });
};
