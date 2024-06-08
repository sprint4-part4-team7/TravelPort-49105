import React from 'react';
import Button from '@/components/common/Button';

type ButtonProps = {
  disabled: boolean;
};
const CheckButton = ({ disabled }: ButtonProps) => {
  return (
    <div className="absolute bottom-24 mx-40 w-[calc(100%-364px)]">
      <Button
        variant="default"
        buttonStyle="text-16 p-16"
        text="다음"
        disabled={disabled}
      />
    </div>
  );
};

export default CheckButton;
