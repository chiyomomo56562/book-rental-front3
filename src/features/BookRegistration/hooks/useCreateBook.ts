import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createBook } from '../api';
import { mapToCreateBookRequest } from '../mapper';
import { RegistrationFormValues } from '../types';

export const useCreateBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: RegistrationFormValues) => {
      const request = mapToCreateBookRequest(values);
      return createBook(request);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['books', 'list'] });
      navigate('/');
    },
  });
};
