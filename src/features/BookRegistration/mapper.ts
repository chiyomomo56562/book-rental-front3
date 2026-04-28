import { RegistrationFormValues, CreateBookRequest } from './types';

export const mapToCreateBookRequest = (values: RegistrationFormValues): CreateBookRequest => {
  return {
    title: values.title.trim(),
  };
};
