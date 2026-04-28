import { http, HttpResponse, delay } from 'msw';

export const handlers = [
  // Example handler
  http.get('/api/health', () => {
    return HttpResponse.json({ status: 'ok' });
  }),

  // Book Registration
  http.post('/api/books', async ({ request }) => {
    await delay(100);
    const newBook = (await request.json()) as { title: string };
    
    if (newBook.title === 'Existing Book') {
      return HttpResponse.json(
        { status: 409, data: null, error: 'Conflict' },
        { status: 409 }
      );
    }

    return HttpResponse.json(
      {
        status: 201,
        data: {
          id: 'new-book-id',
          title: newBook.title,
          status: 'AVAILABLE',
        },
        error: null,
      },
      { status: 201 }
    );
  }),

  // Book List
  http.get('/api/books', async () => {
    await delay(100);
    return HttpResponse.json(
      {
        status: 200,
        data: [
          { id: 'book-1', title: 'Clean Code', status: 'AVAILABLE' },
          { id: 'book-2', title: 'Refactoring', status: 'RENTED' },
        ],
        error: null,
      },
      { status: 200 }
    );
  }),
];
