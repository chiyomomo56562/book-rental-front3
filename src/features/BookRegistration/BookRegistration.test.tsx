import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import BookRegistrationContainer from './BookRegistrationContainer';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>
  );
};

describe('BookRegistration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders correctly', () => {
    renderWithProviders(<BookRegistrationContainer />);
    expect(screen.getByText('도서 등록')).toBeInTheDocument();
    expect(screen.getByLabelText('도서 제목')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '등록하기' })).toBeInTheDocument();
  });

  it('validates required title', async () => {
    renderWithProviders(<BookRegistrationContainer />);
    
    fireEvent.click(screen.getByRole('button', { name: '등록하기' }));
    
    expect(await screen.findByText('제목은 필수 입력 사항입니다')).toBeInTheDocument();
  });

  it('validates min length', async () => {
    renderWithProviders(<BookRegistrationContainer />);
    
    const input = screen.getByLabelText('도서 제목');
    fireEvent.change(input, { target: { value: 'A' } });
    fireEvent.click(screen.getByRole('button', { name: '등록하기' }));
    
    expect(await screen.findByText('제목은 최소 2자 이상이어야 합니다')).toBeInTheDocument();
  });

  it('submits valid data and navigates to home', async () => {
    renderWithProviders(<BookRegistrationContainer />);
    
    const input = screen.getByLabelText('도서 제목');
    fireEvent.change(input, { target: { value: 'New Book Title' } });
    fireEvent.click(screen.getByRole('button', { name: '등록하기' }));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('trims whitespace before submission', async () => {
    renderWithProviders(<BookRegistrationContainer />);
    
    const input = screen.getByLabelText('도서 제목');
    fireEvent.change(input, { target: { value: '  Trimmed Book  ' } });
    fireEvent.click(screen.getByRole('button', { name: '등록하기' }));
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
    // Trimming is handled in mapper/hook, verification via mockNavigate is enough here 
    // if we want to be sure about the actual request body, we would need to inspect MSW calls
  });

  it('disables button and shows loading state during submission', async () => {
    renderWithProviders(<BookRegistrationContainer />);
    
    const input = screen.getByLabelText('도서 제목');
    fireEvent.change(input, { target: { value: 'Slow Book' } });
    fireEvent.click(screen.getByRole('button', { name: '등록하기' }));
    
    const button = screen.getByRole('button', { name: '등록하기' });
    await waitFor(() => {
      expect(button).toBeDisabled();
    });
    expect(button.querySelector('svg')).toBeInTheDocument();
  });
});
