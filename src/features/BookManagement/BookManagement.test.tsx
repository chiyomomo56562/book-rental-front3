import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import { BookManagementContainer } from './BookManagementContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

// Mocking useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    MemoryRouter: actual.MemoryRouter,
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
      }
    },
  });

describe('BookManagement Feature', () => {
  const bookId = 'book-1';
  const initialTitle = 'Clean Code';
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
    vi.spyOn(window, 'alert').mockImplementation(() => {});
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

  it('수정 버튼 클릭 시 모달이 열리고 제목을 수정할 수 있다', async () => {
    renderWithProviders(
      <BookManagementContainer bookId={bookId} currentTitle={initialTitle} />
    );

    // 수정 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /제목 수정/i }));

    // 모달 내 입력 필드 확인
    const input = screen.getByLabelText(/제목/i) as HTMLInputElement;
    expect(input.value).toBe(initialTitle);

    // 제목 변경
    fireEvent.change(input, { target: { value: 'Clean Architecture' } });

    // 저장 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /저장/i }));

    // API 호출 후 모달 닫힘 확인
    await waitFor(() => {
      expect(screen.queryByLabelText(/제목/i)).not.toBeInTheDocument();
    });
  });

  it('삭제 버튼 클릭 시 confirm 확인 후 삭제 API가 호출되고 목록으로 이동한다', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    renderWithProviders(
      <BookManagementContainer bookId={bookId} currentTitle={initialTitle} />
    );

    // 삭제 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /도서 삭제/i }));

    // confirm 호출 확인
    expect(confirmSpy).toHaveBeenCalledWith('정말 삭제하시겠습니까?');

    // 목록 페이지로 이동 확인
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('삭제 confirm에서 취소를 누르면 삭제 API를 호출하지 않는다', async () => {
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(false);

    renderWithProviders(
      <BookManagementContainer bookId={bookId} currentTitle={initialTitle} />
    );

    // 삭제 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /도서 삭제/i }));

    // confirm 호출 확인
    expect(confirmSpy).toHaveBeenCalled();
    
    // navigate가 호출되지 않아야 함
    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it('빈 제목으로 수정 시도 시 에러를 표시한다', async () => {
    renderWithProviders(
      <BookManagementContainer bookId={bookId} currentTitle={initialTitle} />
    );

    // 수정 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /제목 수정/i }));

    const input = screen.getByLabelText(/제목/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: ' ' } });

    // 저장 버튼 클릭
    fireEvent.click(screen.getByRole('button', { name: /저장/i }));
    
    expect(await screen.findByText(/제목을 입력해주세요/i)).toBeInTheDocument();
  });
});
