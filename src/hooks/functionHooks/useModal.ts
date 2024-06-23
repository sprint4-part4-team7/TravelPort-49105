import { useState } from 'react';

/**
 *
 * @returns {object} - `isOpen`, `openModal`, `closeModal`을 반환
 */
const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  /**
   * `isOpen`을 `true`로 변경
   */
  const openModal = () => {
    setIsModalOpen(true);
  };
  /**
   * `isOpen`을 `false`로 변경
   */
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return {
    isModalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
