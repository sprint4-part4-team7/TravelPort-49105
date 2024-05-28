import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';
import ModalPortal from '@/utils/ModalPortal';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
  modal?: string;
};

const Modal = ({ isOpen, children, closeModal, modal = '' }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const modalBasicClass = `flex flex-col fixed top-1/2 left-1/2 bg-white rounded-8 z-50 transform -translate-x-1/2 -translate-y-1/2 px-28 py-32 ${isOpen ? 'block' : ''}`;

  const modalClass = twMerge(modalBasicClass, modal);

  console.log(modalClass);

  return (
    <ModalPortal>
      <div
        className="fixed left-0 top-0 w-full h-full bg-black-modal"
        onClick={closeModal}
      />
      <div className={modalClass}>{children}</div>
    </ModalPortal>
  );
};

export default Modal;
