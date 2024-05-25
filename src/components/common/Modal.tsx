import { ReactNode } from 'react';
import ModalPortal from '@/utils/ModalPortal';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
  closeModal: () => void;
};

const Modal = ({ isOpen, children, closeModal }: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const modalClass =
    'flex flex-col fixed top-1/2 left-1/2  bg-white rounded-8 z-50 transform -translate-x-1/2 -translate-y-1/2 px-28 py-32';

  return (
    <ModalPortal>
      <button
        type="button"
        className="fixed left-0 top-0 w-full h-full bg-black"
        onClick={closeModal}
      />
      <div className={`${modalClass} ${isOpen ? 'block' : ''}`}>{children}</div>
    </ModalPortal>
  );
};

export default Modal;
