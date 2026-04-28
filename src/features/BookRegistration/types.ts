export interface CreateBookRequest {
  title: string;
}

export interface BookResponse {
  id: string;
  title: string;
  status: 'AVAILABLE' | 'RENTED';
}

export interface RegistrationFormValues {
  title: string;
}
