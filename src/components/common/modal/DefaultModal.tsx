import React from 'react';
import Button from '../button/Button';
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
      <div className="flex flex-col items-center justify-between text-center w-344">
        <div className="w-full font-semibold text-left text-20">{title}</div>
        {children ? (
          <div className="w-full h-full pt-24 text-16">{children}</div>
        ) : null}
        <div className="flex justify-end w-full gap-16 pt-48">
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
