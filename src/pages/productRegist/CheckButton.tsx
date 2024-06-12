import React from 'react';
import Button from '@/components/common/Button';

type ButtonProps = {
  disabled: boolean;
  onClick?: () => void;
};
const CheckButton = ({ disabled, onClick }: ButtonProps) => {
  return (
    <div className="absolute bottom-24 mx-40 w-[calc(100%-364px)]">
      <Button
        buttonType="submit"
        variant="default"
        buttonStyle="text-16 p-16"
        disabled={disabled}
        onClick={onClick}
      >
        다음
      </Button>
    </div>
  );
};

export default CheckButton;
