import { ReactNode, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import ModalPortal from '@/utils/ModalPortal';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
  modal?: string;
};

const Modal = ({ isOpen, children, closeModal, modal = '' }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const modalBasicClass = `flex flex-col fixed top-1/2 z-modal left-1/2 bg-white transform -translate-x-1/2 -translate-y-1/2 px-28 py-32 ${isOpen ? 'block' : ''}`;

  const modalClass = twMerge(modalBasicClass, modal);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  if (!isOpen) {
    return null;
  }

  return (
    <ModalPortal>
      <div
        className="fixed left-0 top-0 w-full h-full z-modal bg-black-modal"
        onClick={closeModal}
      />
      <div className={modalClass}>{children}</div>
      {/* <button onClick={closeModal}>취소</button> */}
    </ModalPortal>
  );
};

export default Modal;
