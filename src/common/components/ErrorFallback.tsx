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
      <button
        type="button"
        onClick={() => resetErrorBoundary()}
        className="btn btn-primary"
        aria-label="Retry loading repositories"
      >
        Try again
      </button>
    </section>
  );
}
