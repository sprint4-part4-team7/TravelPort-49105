import { ReactNode } from 'react';
import ModalPortal from '@/utils/ModalPortal';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <ModalPortal>
      <div className="my-16 border-1 p-16">{children}</div>
    </ModalPortal>
  );
};

export default Modal;
