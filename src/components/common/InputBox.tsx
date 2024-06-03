import React from 'react';
import { FieldError } from 'react-hook-form';

type InputBoxProps = {
  label: string;
  inputType?: 'text' | 'password' | 'number';
  value?: string | number;
  placeholder?: string;
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
  error,
  register,
  onChange = undefined,
  disabled = false,
}: InputBoxProps) => {
  const inputboxBasic =
    'p-12 rounded text-16 outline-none border-solid border-1 border-black-5';
  const focusDesign = 'focus:border-blue-6 focus:border-1';
  const errorDesign = 'border-system-error';

  let inputboxClass = `${inputboxBasic} ${focusDesign}`;

  if (error) {
    inputboxClass = `${inputboxBasic} ${errorDesign}`;
  }

  return (
    <div className="flex flex-col gap-8" style={{ width }}>
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
