import React from 'react';

type ImageButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  outlined?: boolean;
};

const styles = {
  default: 'bg-blue-6 text-white hover:bg-blue-5 active:bg-blue-7',
  outlined:
    'bg-white border-1 border-solid border-blue-6 text-blue-6 hover:border-blue-5 hover:text-blue-5 active:border-blue-7 active:text-blue-7',
  disabledDefault: 'bg-black-4 text-black-6',
  disabledOutlined:
    'bg-white border-1 border-solid border-black-4 text-black-6',
};

const getButtonClass = (disabled: boolean, outlined: boolean) => {
  if (disabled) {
    return outlined ? styles.disabledOutlined : styles.disabledDefault;
  }
  return outlined ? styles.outlined : styles.default;
};

const ImageButton = ({
  children,
  onClick,
  disabled = false,
  outlined = false,
}: ImageButtonProps) => {
  return (
    <button
      className={`text-16 p-12 flex gap-6 justify-center items-center ${getButtonClass(disabled, outlined)}`}
      type="submit"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default ImageButton;
