import React = require('react');

type ModalProps = {
  isOpen: boolean;
};

const Modal: React.FC<ModalProps> = ({ isOpen }: ModalProps) => {
  if (!isOpen) {
    return null;
  }
  return (
    <div>
      <div className="my-16 border-1 p-16">
        <h2>모달 예시</h2>
        <p>모달이 짜잔</p>
      </div>
    </div>
  );
};

export default Modal;
