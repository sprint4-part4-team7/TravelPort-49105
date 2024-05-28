import EditInfo from '@/components/EditInfo';
import Modal from '@/components/common/Modal';
import useModal from '@/hooks/useModal';

const ModalExample = () => {
  //  useModal 훅을 사용하여 isOpen, openModal, closeModal을 가져온다.
  const { isModalOpen, openModal, closeModal } = useModal();
  // 모달 컴포넌트를 Modal 컴포넌트로 감싸고, isOpen과 closeModal을 props로 전달한다.
  // 모달 열림 버튼에 openModal 함수를 연결한다.
  // 모달 컴포넌트에 className을 추가하여 모달의 추가적 클래스를 조절한다.
  return (
    <div>
      <button onClick={openModal} type="button" className="p-16 border-1">
        Open Modal
      </button>
      <Modal isOpen={isModalOpen} closeModal={closeModal} modal="w-900">
        <EditInfo />
      </Modal>
    </div>
  );
};

export default ModalExample;
