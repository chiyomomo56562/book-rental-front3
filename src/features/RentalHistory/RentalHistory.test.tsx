import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { RentalHistoryContainer } from './RentalHistoryContainer';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { format } from 'date-fns';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

describe('RentalHistory', () => {
  it('대여 이력 목록이 정상적으로 렌더링되어야 한다', async () => {
    const queryClient = createTestQueryClient();
    const date1 = format(new Date('2024-04-28T09:00:00Z'), 'yyyy.MM.dd HH:mm');
    const date2 = format(new Date('2024-04-27T10:00:00Z'), 'yyyy.MM.dd HH:mm');
    const date3 = format(new Date('2024-04-27T15:00:00Z'), 'yyyy.MM.dd HH:mm');

    render(
      <QueryClientProvider client={queryClient}>
        <RentalHistoryContainer bookId="book-1" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(date1)).toBeInTheDocument();
      expect(screen.getByText(date2)).toBeInTheDocument();
    });

    expect(screen.getByText('대여 중')).toBeInTheDocument();
    expect(screen.getByText(date3)).toBeInTheDocument();
  });

  it('대여 이력이 없을 때 안내 메시지가 표시되어야 한다', async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <RentalHistoryContainer bookId="empty-history-id" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('대여 이력이 없습니다.')).toBeInTheDocument();
    });
  });

  it('API 에러 시 에러 메시지가 표시되어야 한다', async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <RentalHistoryContainer bookId="error-id" />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('대여 이력을 불러오는 중 에러가 발생했습니다.')).toBeInTheDocument();
    });
  });
});
