import React from 'react';
import { FieldError } from 'react-hook-form';

type InputBoxProps = {
  label: string;
  inputType?: 'text' | 'password' | 'number';
  value?: string | number;
  placeholder?: string;
  direction?: 'row' | 'col';
  width?: string;
  error?: FieldError;
  register?: any;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
  disabled?: boolean;
};

const InputBox = ({
  label,
  inputType = 'text',
  value,
  placeholder = '입력',
  width = '100%',
  direction = 'col',
  error,
  register,
  onChange = undefined,
  disabled = false,
}: InputBoxProps) => {
  const inputboxBasic = `p-12 rounded text-16 outline-none border-solid border-1 border-black-5 ${direction === 'col' ? '' : 'w-full max-w-335 mobile:max-w-none'}`;
  const focusDesign = 'focus:border-blue-6 focus:border-1';
  const errorDesign = 'border-system-error';

  let inputboxClass = `${inputboxBasic} ${focusDesign}`;

  if (error) {
    inputboxClass = `${inputboxBasic} ${errorDesign}`;
  }

  return (
    <div
      className={`flex gap-8 ${direction === 'col' ? 'flex-col' : 'flew-row items-center justify-end mobile:flex-col mobile:items-start mobile:justify-start'}`}
      style={{ width }}
    >
      <label className="text-16" htmlFor={inputType}>
        {label}
      </label>
      <input
        className={inputboxClass}
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...register}
      />
      {error && (
        <div className="text-system-error text-12">{error.message}</div>
      )}
    </div>
  );
};

export default InputBox;
