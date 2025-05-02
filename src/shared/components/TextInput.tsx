'use client';
import cn from 'classnames';
import { useFormContext } from 'react-hook-form';

import type { InputHTMLAttributes } from 'react';

type Props = {
  name: string;
  label: string;
  isOptional?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const TextInput = (props: Props) => {
  const { name, label, isOptional, onChange: inputOnChange, ...rest } = props;
  const {
    register,
    clearErrors,
    formState: { errors },
  } = useFormContext();
  const isError = !!errors[name];
  const errorMessage = errors[name]?.message?.toString();

  const { onChange: registerOnchange, ...registerRest } = register(name);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    registerOnchange(e);
    if (inputOnChange) inputOnChange(e);
    if (errorMessage) clearErrors(name);
  };

  return (
    <div className="relative">
      <input
        {...registerRest}
        id={name}
        onChange={onChange}
        placeholder=" "
        className={cn(
          'peer focus:border-main block w-full appearance-none rounded-t-lg border-0 border-b-2 border-gray-300 bg-white px-2.5 pt-5 pb-2.5 text-base text-gray-900 placeholder:text-transparent focus:ring-0 focus:outline-hidden focus:placeholder:text-gray-400',
          { ['border-error!']: isError },
        )}
        {...rest}
      />
      <label
        htmlFor={name}
        className={cn(
          'peer-focus:text-main absolute top-4 left-2.5 z-10 origin-[0] -translate-y-4 scale-75 transform text-sm font-bold text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-75',
          { ['text-error! peer-focus:text-error!']: isError },
        )}
      >
        {label}
      </label>
      {isOptional && <p className="absolute top-2 right-2 text-xs text-gray-400">Optional</p>}
      {isError && <p className="text-error mt-2 ml-2 text-sm">{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
