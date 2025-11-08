import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function LoadingPlaceholder() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading repositories"
      className="flex flex-col items-center justify-center py-20"
    >
      <ArrowPathIcon
        className="h-8 w-8 animate-spin text-base-content opacity-70"
        aria-hidden="true"
      />
      <p className="mt-4 text-sm text-base-content opacity-70">
        Loading repositories...
      </p>
    </div>
  );
}
