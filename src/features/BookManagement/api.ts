import axiosInstance from '../../shared/api/axiosInstance';
import { RenameBookTitleRequest, BookManagementResponse } from './types';

export const renameTitle = async (id: string, request: RenameBookTitleRequest) => {
  const { data } = await axiosInstance.patch<BookManagementResponse>(
    `/books/${id}/title`,
    request
  );
  return data;
};

export const removeBook = async (id: string) => {
  const { data } = await axiosInstance.delete<BookManagementResponse>(
    `/books/${id}`
  );
  return data;
};
