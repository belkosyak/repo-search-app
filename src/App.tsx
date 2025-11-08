import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RepoList } from './repos/RepoList';
import { ThemeProvider } from './theme/ThemeProvider';
import { PageLayout } from './common/components/PageLayout';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <PageLayout>
          <RepoList />
        </PageLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
