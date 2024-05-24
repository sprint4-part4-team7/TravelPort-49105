import React = require('react');
import Modal from '@/components/common/modal';
import useModal from '@/hooks/useModal';

const MyPage: React.FC = () => {
  const { isOpen, clickModal } = useModal();
  return (
    <div>
      <button onClick={clickModal} type="button" className="p-16 border-1">
        Open Modal
      </button>
      <Modal isOpen={isOpen} />
    </div>
  );
};

export default MyPage;
