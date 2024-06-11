import { UseFormRegisterReturn } from 'react-hook-form';

type NumberInputBoxProps = {
  register?: UseFormRegisterReturn;
  numberBox: string;
  unit: string;
  placeholder?: string;
  min?: number;
  max?: number;
  readOnly?: boolean;
};

const NumberInputBox = ({
  register,
  numberBox,
  unit,
  placeholder,
  min,
  max,
  readOnly,
}: NumberInputBoxProps) => {
  return (
    <div>
      <input
        {...register}
        type="number"
        id={numberBox}
        placeholder={placeholder}
        min={min}
        max={max}
        readOnly={readOnly}
      />
      <label htmlFor={numberBox}>{unit}</label>
    </div>
  );
};

export default NumberInputBox;
