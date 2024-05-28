// ModalPortal.tsx
import { ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalPortalProps {
  children: ReactNode;
}

const ModalPortal = ({ children }: ModalPortalProps) => {
  const modalRoot = document.getElementById('modal-root') as HTMLElement;

  return createPortal(children, modalRoot);
};

export default ModalPortal;
