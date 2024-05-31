import React from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TextBoxProps = {
  labelName: string;
  textLimit: number;
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  register?: UseFormRegisterReturn;
  error?: FieldError;
};

const TextBox = ({
  labelName,
  textLimit,
  placeholder,
  value,
  onChange,
  register,
  error,
}: TextBoxProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-3xl font-bold" htmlFor={labelName}>
        {labelName}
      </label>
      <textarea
        className="border-black text-2xl border-solid border-1 w-300"
        placeholder={placeholder}
        maxLength={textLimit}
        value={value}
        onChange={onChange}
        {...register}
      />
    </div>
  );
};

export default TextBox;
