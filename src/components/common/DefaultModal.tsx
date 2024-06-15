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
  buttonText = '확인',
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
    <div className="flex flex-col w-475 h-full text-center justify-between items-center">
      <div className="text-20 w-full font-normal py-24">{title}</div>
      {children ? (
        <div className="text-16 w-full h-full pb-24">{children}</div>
      ) : null}
      <div className="flex gap-8 justify-end w-full pt-8">
        <Button
          outlined
          buttonStyle="px-32 text-16 p-12"
          width="w-fit mobile:w-full"
          onClick={closeModal}
        >
          닫기
        </Button>
        {!!onConfirm && (
          <Button
            buttonStyle="px-32 text-16 p-12"
            width="w-fit mobile:w-full"
            onClick={handleConfirm}
          >
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  );
};

export default DefaultModal;
