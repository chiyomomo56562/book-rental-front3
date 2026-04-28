import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeBook } from '../api';
import { mapManagementResponse } from '../mapper';
import { useNavigate } from 'react-router-dom';

export const useRemoveBook = (id: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => removeBook(id),
    onSuccess: (data) => {
      const isSuccess = mapManagementResponse(data);
      if (isSuccess) {
        queryClient.invalidateQueries({ queryKey: ['books'] });
        navigate('/');
      }
    },
    onError: (error: any) => {
      // API_RULE: error handling flow - api (throw) -> hooks (React Query Catch) -> UI (Boundary/Toast)
      // For now, we let the UI handle it via mutation's error state or global toast
      alert(error.response?.data?.error || '삭제 중 오류가 발생했습니다.');
    }
  });
};
