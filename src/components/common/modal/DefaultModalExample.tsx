import useModal from '@/hooks/useModal';
import DefaultModal from './DefaultModal';
import Button from '../Button';

// 얘도 그냥 일반 모달처럼 평범하게 불러오면 됨
// 따로 Modal 컴포넌트를 만들어서 사용하는 것이 아니라, DefaultModal 컴포넌트를 사용하면 됨
const DefaultModalExample = () => {
  // useModal 훅을 사용하여 isModalOpen, openModal, closeModal을 가져옴
  const { isModalOpen, openModal, closeModal } = useModal();
  // 만약 모달 안에서 따로 실행할 함수가 필요하다면 closeModal 없이 onConfirm에 넣어주면 됨
  const handleConfirm = () => console.log('확인');

  return (
    <>
      <Button onClick={openModal}>예시</Button>
      Modal처럼 isOpen, closeModal 등 props를 넘겨주고, 내부에는 children으로
      내용을 넣어줌 제목은 title에 넣고,
      <DefaultModal
        isOpen={isModalOpen}
        title="제목"
        closeModal={closeModal}
        onConfirm={handleConfirm}
      >
        <div>내용</div>
      </DefaultModal>
    </>
  );
};

export default DefaultModalExample;
