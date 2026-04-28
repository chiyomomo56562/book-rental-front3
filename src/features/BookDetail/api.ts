import axiosInstance from '../../shared/api/axiosInstance';
import { RawBookDetail } from './types';

export const getBookDetail = async (id: string) => {
  const { data } = await axiosInstance.get<{ data: RawBookDetail }>(`/books/${id}`);
  return data.data;
};

export const rentalBook = async (id: string) => {
  const { data } = await axiosInstance.post<{ data: boolean }>(`/books/${id}/rentals`);
  return data.data;
};

export const returnBook = async (id: string) => {
  const { data } = await axiosInstance.patch<{ data: boolean }>(`/books/${id}/rentals/return`);
  return data.data;
};
