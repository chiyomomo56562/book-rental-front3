import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BookListContainer } from './BookListContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { server } from '../../app/mocks/server';
import { http, HttpResponse } from 'msw';

const navigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigate,
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

describe('BookListFeature', () => {
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

  it('서버의 도서 목록을 정상적으로 렌더링한다', async () => {
    renderWithProviders(<BookListContainer />);

    expect(await screen.findByText('Clean Code')).toBeInTheDocument();
    expect(screen.getByText('Refactoring')).toBeInTheDocument();
  });

  it('상태에 따라 올바른 텍스트와 색상을 표시한다', async () => {
    renderWithProviders(<BookListContainer />);

    const availableBadge = await screen.findByText('대여 가능');
    const rentedBadge = await screen.findByText('대여 중');

    expect(availableBadge).toHaveClass('bg-green-100');
    expect(rentedBadge).toHaveClass('bg-red-100');
  });

  it('도서 카드 클릭 시 상세 페이지로 이동한다', async () => {
    renderWithProviders(<BookListContainer />);

    const bookCard = await screen.findByText('Clean Code');
    fireEvent.click(bookCard.closest('div[role="button"]')!);

    expect(navigate).toHaveBeenCalledWith('/books/book-1');
  });

  it('도서가 없을 때 빈 상태 메시지를 표시한다', async () => {
    server.use(
      http.get('/api/books', () => {
        return HttpResponse.json({
          status: 200,
          data: [],
          error: null,
        });
      })
    );

    renderWithProviders(<BookListContainer />);

    expect(await screen.findByText('등록된 도서가 없습니다.')).toBeInTheDocument();
  });

  it('API 에러 발생 시 에러 메시지와 다시 시도 버튼을 표시한다', async () => {
    server.use(
      http.get('/api/books', () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    renderWithProviders(<BookListContainer />);

    expect(await screen.findByText('도서 목록을 불러오는 중 오류가 발생했습니다.')).toBeInTheDocument();
    expect(screen.getByText('다시 시도')).toBeInTheDocument();
  });
});
