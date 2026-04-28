import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppRouterProvider } from './app/providers/AppRouterProvider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRouterProvider />
    </QueryClientProvider>
  );
}

export default App;
