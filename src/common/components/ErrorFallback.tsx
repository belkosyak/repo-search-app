export function ErrorFallback({
  resetErrorBoundary,
}: {
  resetErrorBoundary: () => void;
}) {
  return (
    <div>
      There was an error!
      <button onClick={() => resetErrorBoundary()}>Try again</button>
    </div>
  );
}
