import { Button } from '@i4o/catalystui';

export function ErrorFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <section role="alert" aria-live="assertive">
      <h2>Error loading repositories</h2>
      <p>
        There was an error while loading the repositories. Please try again.
      </p>
      <Button
        onClick={() => resetErrorBoundary()}
        ariaLabel="Retry loading repositories"
      >
        Try again
      </Button>
    </section>
  );
}
