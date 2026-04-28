import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BookDetailContainer } from './BookDetailContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, useParams } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('BookDetailFeature', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  const renderWithProviders = (ui: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          {ui}
        </MemoryRouter>
      </QueryClientProvider>
    );
  };

  it('도서 상세 정보를 로드하고 표시한다', async () => {
    (useParams as any).mockReturnValue({ id: 'book-1' });

    renderWithProviders(<BookDetailContainer />);

    expect(await screen.findByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('현재 대여 가능')).toBeInTheDocument();
    expect(screen.getByText('대여하기')).toBeInTheDocument();
  });

  it('상태가 RENTED인 경우 반납하기 버튼이 표시된다', async () => {
    (useParams as any).mockReturnValue({ id: 'book-2' });

    renderWithProviders(<BookDetailContainer />);

    expect(await screen.findByText('Refactoring')).toBeInTheDocument();
    expect(screen.getByText('현재 대여 중')).toBeInTheDocument();
    expect(screen.getByText('반납하기')).toBeInTheDocument();
  });

  it('대여하기 버튼 클릭 시 대여 처리를 수행하고 성공 알림을 표시한다', async () => {
    (useParams as any).mockReturnValue({ id: 'book-1' });
    const consoleSpy = vi.spyOn(console, 'log');

    renderWithProviders(<BookDetailContainer />);

    const rentalButton = await screen.findByText('대여하기');
    fireEvent.click(rentalButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('대여 성공');
    });
  });

  it('반납하기 버튼 클릭 시 반납 처리를 수행하고 성공 알림을 표시한다', async () => {
    (useParams as any).mockReturnValue({ id: 'book-2' });
    const consoleSpy = vi.spyOn(console, 'log');

    renderWithProviders(<BookDetailContainer />);

    const returnButton = await screen.findByText('반납하기');
    fireEvent.click(returnButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('반납 성공');
    });
  });

  it('상세 정보 로드 실패 시 에러 메시지를 표시한다', async () => {
    (useParams as any).mockReturnValue({ id: 'error-id' });

    renderWithProviders(<BookDetailContainer />);

    expect(await screen.findByText('도서 정보를 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
  });
});
