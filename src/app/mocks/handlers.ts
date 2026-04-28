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

  // Book Detail
  http.get('/api/books/:id', async ({ params }) => {
    await delay(100);
    const { id } = params;
    
    if (id === 'error-id') {
      return HttpResponse.json(
        { status: 500, data: null, error: 'Internal Server Error' },
        { status: 500 }
      );
    }

    const status = id === 'book-2' ? 'RENTED' : 'AVAILABLE';
    return HttpResponse.json(
      {
        status: 200,
        data: {
          id,
          title: id === 'book-1' ? 'Clean Code' : 'Refactoring',
          status,
        },
        error: null,
      },
      { status: 200 }
    );
  }),

  // Rental Book
  http.post('/api/books/:id/rentals', async () => {
    await delay(100);
    return HttpResponse.json(
      { status: 200, data: true, error: null },
      { status: 200 }
    );
  }),

  // Return Book
  http.patch('/api/books/:id/rentals/return', async () => {
    await delay(100);
    return HttpResponse.json(
      { status: 200, data: true, error: null },
      { status: 200 }
    );
  }),

  // Rental History
  http.get('/api/books/:id/rentals', async ({ params }) => {
    await delay(100);
    const { id } = params;

    if (id === 'error-id') {
      return HttpResponse.json(
        { status: 500, data: null, error: 'Internal Server Error' },
        { status: 500 }
      );
    }

    if (id === 'empty-history-id') {
      return HttpResponse.json(
        { status: 200, data: [], error: null },
        { status: 200 }
      );
    }

    return HttpResponse.json(
      {
        status: 200,
        data: [
          {
            id: 'rental-2',
            bookId: id,
            rentedAt: '2024-04-28T09:00:00Z',
            returnedAt: null,
          },
          {
            id: 'rental-1',
            bookId: id,
            rentedAt: '2024-04-27T10:00:00Z',
            returnedAt: '2024-04-27T15:00:00Z',
          },
        ],
        error: null,
      },
      { status: 200 }
    );
  }),

  // Rename Book Title
  http.patch('/api/books/:id/title', async ({ request }) => {
    await delay(100);
    const { title } = (await request.json()) as { title: string };

    if (!title) {
      return HttpResponse.json(
        { status: 400, data: null, error: 'Title is required' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { status: 200, data: true, error: null },
      { status: 200 }
    );
  }),

  // Remove Book
  http.delete('/api/books/:id', async ({ params }) => {
    await delay(100);
    const { id } = params;

    if (id === 'rented-book-id') {
      return HttpResponse.json(
        { status: 400, data: null, error: 'Cannot delete rented book' },
        { status: 400 }
      );
    }

    return HttpResponse.json(
      { status: 200, data: true, error: null },
      { status: 200 }
    );
  }),
];
