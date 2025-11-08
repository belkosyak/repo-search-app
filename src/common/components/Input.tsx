import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', invalid = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={
          'block w-full rounded-md border-0 bg-white py-1.5 ' +
          'text-gray-900 shadow-sm ring-1 ring-inset ' +
          'placeholder:text-gray-400 focus:ring-2 focus:ring-inset ' +
          'focus:ring-blue-600 focus-visible:outline-none ' +
          'focus-visible:ring-2 focus-visible:ring-inset ' +
          'focus-visible:ring-blue-600 sm:text-sm sm:leading-6 ' +
          'dark:bg-gray-800 dark:text-gray-100 ' +
          'dark:placeholder:text-gray-500 dark:focus:ring-blue-500 ' +
          'dark:focus-visible:ring-blue-500 ' +
          (invalid
            ? 'ring-red-300 dark:ring-red-700 ' +
              'focus:ring-red-600 dark:focus:ring-red-500'
            : 'ring-gray-300 dark:ring-gray-600') +
          ' ' +
          className
        }
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
