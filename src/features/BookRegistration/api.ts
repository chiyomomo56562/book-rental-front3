import axiosInstance from '../../shared/api/axiosInstance';
import { CreateBookRequest, BookResponse } from './types';

export const createBook = async (data: CreateBookRequest) => {
  const response = await axiosInstance.post<BookResponse>('/books', data);
  return response.data;
};
