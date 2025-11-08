import { Field, Label } from '@headlessui/react';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';

export function SelectControl({
  value,
  onChange,
  options,
  name,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  name: string;
  label: string;
}) {
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Field>
      <Label>{label}</Label>
      <Listbox value={value} onChange={onChange} name={name}>
        <ListboxButton
          className={
            'relative w-full cursor-default rounded-md bg-white ' +
            'py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ' +
            'ring-1 ring-inset ring-gray-300 focus:outline-none ' +
            'focus:ring-2 focus:ring-blue-600 ' +
            'focus-visible:outline-none focus-visible:ring-2 ' +
            'focus-visible:ring-blue-600 sm:text-sm sm:leading-6 ' +
            'dark:bg-gray-800 dark:text-gray-100 dark:ring-gray-600 ' +
            'dark:focus:ring-blue-500 dark:focus-visible:ring-blue-500'
          }
        >
          <span className="block truncate">
            {selectedOption?.label ?? 'Select...'}
          </span>
          <span
            className={
              'pointer-events-none absolute inset-y-0 right-0 ' +
              'flex items-center pr-2'
            }
          >
            <svg
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d={
                  'M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 ' +
                  '4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 ' +
                  '0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908 ' +
                  'a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0 ' +
                  'l-3.25-3.5a.75.75 0 01.04-1.06z'
                }
                clipRule="evenodd"
              />
            </svg>
          </span>
        </ListboxButton>
        <ListboxOptions
          className={
            'absolute z-10 mt-1 max-h-60 w-full overflow-auto ' +
            'rounded-md bg-white py-1 text-base shadow-lg ' +
            'ring-1 ring-black ring-opacity-5 focus:outline-none ' +
            'sm:text-sm dark:bg-gray-800'
          }
        >
          {options.map((option) => (
            <ListboxOption
              key={option.value}
              value={option.value}
              className={
                'relative cursor-default select-none py-2 pl-3 pr-9 ' +
                'text-gray-900 ui-active:bg-blue-600 ui-active:text-white ' +
                'focus:outline-none focus:bg-blue-50 dark:text-gray-100 ' +
                'dark:ui-active:bg-blue-500 dark:focus:bg-blue-900/30'
              }
            >
              <span className="block truncate ui-selected:font-semibold">
                {option.label}
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </Listbox>
    </Field>
  );
}
