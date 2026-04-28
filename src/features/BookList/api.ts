import axiosInstance from '../../shared/api/axiosInstance';
import { BookListResponse } from './types';

export const getBooks = () => axiosInstance.get<BookListResponse>('/books');
