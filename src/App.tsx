import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RepoList } from './repos/RepoList';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RepoList />
    </QueryClientProvider>
  );
}

export default App;
