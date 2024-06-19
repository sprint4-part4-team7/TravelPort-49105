import React from 'react';
import { FieldError } from 'react-hook-form';

type InputBoxProps = {
  id: string;
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
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void | undefined;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void | undefined;
};

const InputBox = ({
  id,
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
  onFocus = undefined,
  onClick = undefined,
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
      <label className="text-16" htmlFor={id}>
        {label}
      </label>
      <div
        className={`flex flex-col gap-8 w-full ${
          direction === 'col' ? '' : 'max-w-335 mobile:max-w-none'
        }`}
      >
        <input
          id={id}
          className={inputboxClass}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          {...register}
          onFocus={onFocus}
          onClick={onClick}
        />
        {error && (
          <div className="text-system-error text-12">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default InputBox;
