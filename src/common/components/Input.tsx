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
          'input input-bordered w-full ' +
          (invalid ? 'input-error ' : '') +
          className
        }
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
