type ButtonProps = {
  variant?: 'default' | 'cancel';
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({
  variant = 'default',
  text = '',
  onClick,
  disabled = false,
}: ButtonProps) => {
  const buttonBasic =
    'flex justify-center items-center p-[1rem] rounded text-16 font-plexSans font-bold';
  const disabledDesign = 'bg-black-5 text-black-7';
  const cancelDesign = 'bg-black-5 text-black-13';

  let buttonClass = `${buttonBasic} bg-blue-6 hover:bg-blue-5 active:bg-blue-7 text-white`;

  if (disabled) {
    buttonClass = `${buttonBasic} ${disabledDesign}`;
  } else if (variant === 'cancel') {
    buttonClass = `${buttonBasic} ${cancelDesign}`;
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
