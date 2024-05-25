import EditInfo from '@/components/EditInfo';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';

const MyPage = () => {
  const { isOpen, clickModal } = useModal();
  return (
    <div>
      <button onClick={clickModal} type="button" className="p-16 border-1">
        Open Modal
      </button>
      <Modal isOpen={isOpen}>
        <EditInfo />
      </Modal>
    </div>
  );
};

export default MyPage;
