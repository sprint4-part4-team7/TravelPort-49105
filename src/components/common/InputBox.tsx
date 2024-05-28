import React from 'react';

type InputBoxProps = {
  label: string;
  inputType?: 'text' | 'password' | 'number';
  value?: string | number;
  placeholder?: string;
  width?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | undefined;
};

const InputBox = ({
  label,
  inputType = 'text',
  value,
  placeholder = '입력',
  width = '100%',
  onChange = undefined,
}: InputBoxProps) => {
  return (
    <div className="flex flex-col gap-8" style={{ width }}>
      <label className="text-3xl" htmlFor={inputType}>
        {label}
      </label>
      <input
        className="px-20 py-16 rounded-md text-2xl border-solid border-1 border-black"
        type={inputType}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputBox;
