import EditInfo from '@/components/EditInfo';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';

const MyPage = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  return (
    <div>
      <button onClick={openModal} type="button" className="p-16 border-1">
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <EditInfo />
      </Modal>
    </div>
  );
};

export default MyPage;
