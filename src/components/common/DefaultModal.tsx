import React from 'react';
import Button from './Button';
import Modal from './Modal';

interface DefaultModalProps {
  title: string;
  children?: React.ReactNode;
  buttonText?: string;
  isOpen: boolean;
  closeModal: () => void;
  onConfirm?: () => void;
}

const DefaultModal = ({
  title,
  children,
  isOpen,
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

  const justClose = onConfirm === undefined;

  return (
    <Modal isOpen={isOpen} closeModal={closeModal}>
      <div className="flex flex-col w-344 text-center justify-between items-center">
        <div className="text-20 font-semibold text-left w-full">{title}</div>
        {children ? (
          <div className="text-16 w-full h-full pt-24">{children}</div>
        ) : null}
        <div className="flex gap-16 justify-end w-full pt-48">
          <Button
            outlined={!justClose}
            isCancel={!justClose}
            buttonStyle="px-32 text-16 p-12"
            width="w-1/2"
            onClick={closeModal}
          >
            {justClose ? '닫기' : '취소'}
          </Button>
          {!justClose && (
            <Button
              buttonStyle="px-32 text-16 p-12"
              width="w-1/2"
              onClick={handleConfirm}
            >
              {buttonText}
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DefaultModal;
