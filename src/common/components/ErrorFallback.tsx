export function ErrorFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <section
      role="alert"
      aria-live="assertive"
      className="alert alert-error flex flex-col items-center gap-4 my-4"
    >
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-lg font-semibold">Error loading repositories</h2>
        <p className="text-sm">
          There was an error while loading the repositories. Please try again.
        </p>
      </div>
      <button
        type="button"
        onClick={() => resetErrorBoundary()}
        className="btn btn-outline"
        aria-label="Retry loading repositories"
      >
        Try again
      </button>
    </section>
  );
}
