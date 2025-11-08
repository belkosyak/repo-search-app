import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function LoadingPlaceholder() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading repositories"
      className="flex flex-col items-center justify-center py-12"
    >
      <ArrowPathIcon
        className="h-8 w-8 animate-spin text-gray-600 dark:text-gray-400"
        aria-hidden="true"
      />
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        Loading repositories...
      </p>
    </div>
  );
}
