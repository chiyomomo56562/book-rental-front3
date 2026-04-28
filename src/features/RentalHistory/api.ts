import axiosInstance from '../../shared/api/axiosInstance';
import { RawRentalHistory } from './types';

export const getRentalHistory = async (bookId: string) => {
  const { data } = await axiosInstance.get<{ status: number; data: RawRentalHistory[]; error: string | null }>(
    `/books/${bookId}/rentals`
  );
  return data;
};
