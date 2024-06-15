import React from 'react';
import Button from './Button';

interface DefaultModalProps {
  title: string;
  children?: React.ReactNode;
  buttonText?: string;
  closeModal: () => void;
  onConfirm?: () => void;
}

const DefaultModal = ({
  title,
  children,
  buttonText,
  onConfirm,
  closeModal,
}: DefaultModalProps) => {
  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
      closeModal();
    }
  };

  return (
    <div className="flex flex-col w-475 p-16 h-full max-h-300 text-center justify-center items-center">
      <div className="text-20 w-full font-semibold">{title}</div>
      {children ? (
        <div className="text-16 w-full h-full mt-4">{children}</div>
      ) : (
        <div className="block mt-32" />
      )}
      <div className="flex gap-8 justify-end w-full mt-8">
        <Button outlined onClick={closeModal}>
          닫기
        </Button>
        {!!onConfirm && <Button onClick={handleConfirm}>{buttonText}</Button>}
      </div>
    </div>
  );
};

export default DefaultModal;
