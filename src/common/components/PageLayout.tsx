import { ThemeToggle } from '../../theme/ThemeToggle';

interface PageLayoutProps {
  children: React.ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <>
      <div className="fixed top-2 right-2 sm:top-4 sm:right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </>
  );
}
