import { UseFormRegisterReturn } from 'react-hook-form';

type NumberInputBoxProps = {
  labelname: string;
  register?: UseFormRegisterReturn;
  numberBox: string;
  unit: string;
  placeholder?: string;
  max?: number | string;
  readOnly?: boolean;
  divstyle?: string;
  inputstyle?: string;
};

const NumberInputBox = ({
  labelname,
  register,
  numberBox,
  unit,
  placeholder,
  max,
  readOnly,
  divstyle,
  inputstyle,
}: NumberInputBoxProps) => {
  return (
    <label htmlFor={numberBox} className="flex gap-12 flex-col ">
      <p className="text-14">{labelname}</p>
      <div
        className={`${divstyle} flex items-center h-48 p-12 rounded border-solid border-1 border-black-5 has-[:focus]:border-blue-6 focus:border-1 mobile:max-w-none`}
      >
        <input
          {...register}
          className={`${inputstyle} text-16 outline-none`}
          type="number"
          id={numberBox}
          placeholder={placeholder}
          min={0}
          max={max}
          readOnly={readOnly}
        />
        <p className="text-16">{unit}</p>
      </div>
    </label>
  );
};

export default NumberInputBox;
