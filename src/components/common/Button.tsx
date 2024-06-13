import React from 'react';

/* eslint-disable react/button-has-type */
type ButtonProps = {
  buttonType?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'more' | 'floating';
  outlined?: boolean;
  buttonStyle?: string; // font 굵기, text 크기, padding, width 변경 시 tailwind 형식으로 진행
  onClick?: () => void;
  isCancel?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({
  buttonType = 'button',
  variant = 'default',
  outlined = false,
  buttonStyle = 'text-16 p-12',
  onClick,
  isCancel = false,
  disabled = false,
  children,
}: ButtonProps) => {
  const styles = {
    base: `flex justify-center items-center w-full ${variant === 'floating' ? 'rounded-28' : 'rounded-4'} ${buttonStyle}`,
    default: 'bg-blue-6 text-white hover:bg-blue-5 active:bg-blue-7',
    outlined:
      'bg-white border-1 border-solid border-blue-6 text-blue-6 hover:border-blue-5 hover:text-blue-5 active:border-blue-7 active:text-blue-7',
    more: 'px-12 py-8 border-1 border-solid border-black-5 text-black-5 hover:bg-black-2 active:bg-black-3',
    floating: 'rounded-28',
    disabledDefault: 'bg-black-4 text-black-6',
    disabledOutlined:
      'bg-white border-1 border-solid border-black-4 text-black-6',
    cancelDefault:
      'bg-black-4 text-black-12 hover:bg-black-3 active:bg-black-5',
    cancelOutlined:
      'bg-white border-1 border-solid border-black-5 text-black-7 hover:border-black-6 hover:text-black-6 active:border-black-7 active:text-black-8',
  };

  const getButtonClass = () => {
    if (disabled) {
      return outlined ? styles.disabledOutlined : styles.disabledDefault;
    }
    if (isCancel) {
      return outlined ? styles.cancelOutlined : styles.cancelDefault;
    }
    if (variant === 'more') {
      return styles.more;
    }
    if (variant === 'floating') {
      return outlined
        ? `${styles.outlined} ${styles.floating}`
        : `${styles.default} ${styles.floating}`;
    }
    return outlined ? styles.outlined : styles.default;
  };

  return (
    <button
      className={`${styles.base} ${getButtonClass()}`}
      type={buttonType}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
