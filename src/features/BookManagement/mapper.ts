import { BookManagementResponse } from './types';

export const mapManagementResponse = (response: BookManagementResponse): boolean => {
  return response.data;
};
