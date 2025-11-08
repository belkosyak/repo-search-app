import { Field, Label } from '@headlessui/react';

export function RepoTextSearchControl({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field>
      <Label>Search repositories</Label>
      <input
        type="text"
        placeholder="Search by text"
        name="text-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
        aria-label="Search repositories by text"
        className={
          'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ' +
          'ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 ' +
          'focus:ring-2 focus:ring-inset focus:ring-blue-600 ' +
          'focus-visible:outline-none focus-visible:ring-2 ' +
          'focus-visible:ring-inset focus-visible:ring-blue-600 ' +
          'sm:text-sm sm:leading-6 dark:bg-gray-800 dark:text-gray-100 ' +
          'dark:ring-gray-600 dark:placeholder:text-gray-500 ' +
          'dark:focus:ring-blue-500 dark:focus-visible:ring-blue-500'
        }
      />
    </Field>
  );
}
