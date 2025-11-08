import { ThemeToggle } from '../../theme/ThemeToggle';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-base-100 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img
                src="/vite.svg"
                alt="App logo"
                className="h-8 w-8"
                aria-hidden="true"
              />
              <h1 className="text-xl font-bold">Github repo search app</h1>
            </div>
            <div aria-label="Theme controls">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>
      <div className="pt-16">{children}</div>
    </>
  );
}
