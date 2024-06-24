import React, { useState } from 'react';
import { FieldError } from 'react-hook-form';
import EYEON from '@/assets/icons/eyeon.svg';
import EYEOFF from '@/assets/icons/eyeoff.svg';

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
  const [isVisible, setIsVisible] = useState(false);
  const inputboxBasic = `p-12 rounded text-16 outline-none border-solid border-1 border-black-5 ${direction === 'col' ? '' : 'w-full max-w-335 mobile:max-w-none'}`;
  const focusDesign = 'focus:border-blue-6 focus:border-1';
  const errorDesign = 'border-system-error';

  let inputboxClass = `${inputboxBasic} ${focusDesign}`;

  if (error) {
    inputboxClass = `${inputboxBasic} ${errorDesign}`;
  }

  if (inputType === 'password') {
    if (isVisible) {
      // eslint-disable-next-line no-param-reassign
      inputType = 'text';
    }
  }

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

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
        <div
          className={`relative flex flex-col ${
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
          {label.includes('비밀번호') && !disabled && (
            <button
              type="button"
              onClick={toggleVisibility}
              className="absolute top-1/2 right-12 transform -translate-y-1/2"
            >
              {isVisible ? (
                <img src={EYEON} width={16} height={16} alt="비밀번호 보기" />
              ) : (
                <img
                  src={EYEOFF}
                  width={16}
                  height={16}
                  alt="비밀번호 숨기기"
                />
              )}
            </button>
          )}
        </div>
        {error && (
          <div className="text-system-error text-12">{error.message}</div>
        )}
      </div>
    </div>
  );
};

export default InputBox;
