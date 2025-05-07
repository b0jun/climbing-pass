'use client';

import cn from 'classnames';
import { InputHTMLAttributes, forwardRef } from 'react';

type Props = {
  name: string;
  label: string;
  isOptional?: boolean;
  errorMessage?: string;
  className?: string;
  labelClassName?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, isOptional, errorMessage, className, labelClassName, ...rest }, ref) => {
    const isError = !!errorMessage;
    const errorId = `${name}-error`;

    return (
      <div className="relative">
        <input
          id={name}
          name={name}
          placeholder=" "
          ref={ref}
          aria-invalid={isError}
          aria-describedby={isError ? errorId : undefined}
          className={cn(
            'peer focus:border-main block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pt-5 pb-2.5 text-base text-gray-900 placeholder-transparent focus:placeholder-gray-400 focus:ring-0 focus:outline-none',
            { '!border-error': isError },
            className,
          )}
          {...rest}
        />
        <label
          htmlFor={name}
          className={cn(
            'peer-focus:text-main absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75',
            { '!text-error !peer-focus:text-error': isError },
            labelClassName,
          )}
        >
          {label}
        </label>
        {isOptional && <span className="absolute top-2 right-2 text-xs text-gray-400">Optional</span>}
        {isError && (
          <p id={errorId} className="text-error mt-2 ml-2 text-sm">
            {errorMessage}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
