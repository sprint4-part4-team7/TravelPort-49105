type ButtonProps = {
  variant?: 'default' | 'outlined' | 'more' | 'floating';
  buttonStyle?: string; // font 굵기, text 크기, padding, width 변경 시
  text: string;
  isCancel?: boolean;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  variant = 'default',
  buttonStyle = 'text-16 p-12 w-full',
  text = '',
  isCancel = false,
  onClick,
  disabled = false,
}: ButtonProps) => {
  const basic = `flex justify-center items-center rounded ${buttonStyle}`;
  const default = 'bg-blue-6 hover:bg-blue-5 active:bg-blue-7 text-white';
  const outlined =
    'bg-white border-1 border-solid border-blue-6 text-blue-6 hover:border-blue-5 hover:text-blue-5 active:border-blue-7 active:text-blue-7 ';

  const disabledDesign = 'bg-black-4 text-black-6';
  const cancelDesign = 'bg-black-4 text-black-12';

  let buttonClass = `${basic} bg-blue-6 hover:bg-blue-5 active:bg-blue-7 text-white`;

  if (disabled) {
    buttonClass = `${basic} ${disabledDesign}`;
  } else if (variant === 'cancel') {
    buttonClass = `${basic} ${cancelDesign}`;
  }

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
