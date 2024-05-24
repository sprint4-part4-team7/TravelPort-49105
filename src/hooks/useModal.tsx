import { useState } from 'react';

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const clickModal = () => {
    setIsOpen(!isOpen);
  };

  return {
    isOpen,
    clickModal,
  };
};

export default useModal;
