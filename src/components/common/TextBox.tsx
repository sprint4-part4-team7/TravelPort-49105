import React, { useEffect, useState } from 'react';
import { FieldError, UseFormRegisterReturn } from 'react-hook-form';

type TextBoxProps = {
  labelName: string;
  textLimit: number;
  placeholder: string;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: FieldError;
  register?: UseFormRegisterReturn;
};

const TextBox = ({
  labelName,
  textLimit,
  placeholder,
  value,
  onChange,
  error,
  register,
}: TextBoxProps) => {
  const [textLength, setTextLength] = useState<number>(0);
  const handleOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textLength <= textLimit) {
      if (onChange) onChange(event);
      const slicedTextLength = event.target.value.slice(0, textLimit).length;
      setTextLength(slicedTextLength);
    }
  };

  useEffect(() => {
    setTextLength(value.length);
  }, [value.length]);

  const textboxBasic =
    'p-12 rounded text-[1.6rem] w-full h-[15rem] outline-none border-solid border-1 border-black-6 resize-none';
  const focusDesign = 'focus:border-blue-6 focus:border-1';
  const errorDesign = 'border-system-error';

  let textboxClass = `${textboxBasic} ${focusDesign}`;
  let lengthDesign = 'absolute bottom-[0.5rem] right-[0.5rem] text-black-6';

  if (error) {
    textboxClass = `${textboxBasic} ${errorDesign}`;
    lengthDesign = 'absolute bottom-[3.1rem] right-[0.5rem] text-black-6';
  }

  return (
    <div className="relative flex flex-col w-full gap-[0.8rem]">
      <label className="text-[1.6rem]" htmlFor={labelName}>
        {labelName}
      </label>
      <textarea
        className={textboxClass}
        placeholder={placeholder}
        maxLength={textLimit}
        value={value}
        onChange={handleOnChange}
        {...register}
      />

      <p className={`${lengthDesign}`}>
        (<span>{` ${textLength} `}</span>/ {`${textLimit} `})
      </p>
      {error && (
        <div className="text-system-error text-12">{error.message}</div>
      )}
    </div>
  );
};

export default TextBox;
