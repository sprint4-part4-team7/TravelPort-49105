import { useForm } from 'react-hook-form';
import uploadImage from '@/assets/icons/upload.svg';
import useModal from '@/hooks/useModal';
import { PageIdProps } from './productPage';
import Location from './Location';
import CheckButton from './CheckButton';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import ImgModal from './ImgModal';

type DescriptionForm = {
  title: string;
  content: string;
};

const Description = ({ setPage }: PageIdProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<DescriptionForm>({
    mode: 'onChange',
  });

  const outlined = true;

  const { isModalOpen, openModal, closeModal } = useModal();

  const onSubmit = (data: DescriptionForm) => {
    setPage(<Location setPage={setPage} />);
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-40 flex flex-col gap-24">
          <label className="flex gap-12 flex-col" htmlFor="title">
            <p className="text-17">제목</p>
            <input
              className="h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('title', {
                required: true,
              })}
              placeholder="등록할 제목(상품명)을 입력해주세요."
              id="title"
              type="text"
            />
          </label>
          <label className="flex gap-12 flex-col" htmlFor="content">
            <p className="text-17">내용</p>
            <textarea
              className="resize-none h-216 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('content', {
                required: true,
              })}
              placeholder="등록할 상품의 전체적인 설명을 적어주세요.(1,000자)"
              id="content"
              maxLength={1000}
            />
          </label>
          <div className="flex flex-col gap-12">
            <p className="text-17">이미지 업로드</p>
            <div className="flex flex-row gap-32 items-center">
              <div className="flex flex-col gap-8 items-center">
                <div className="w-120 h-120 rounded-3 bg-black-4" />
                <p className="text-14">대표 이미지</p>
              </div>
              <div className="w-153">
                <Button
                  buttonType="button"
                  buttonStyle="h-44 text-14 p-12 flex gap-6 justify-center items-center"
                  variant="floating"
                  outlined={outlined}
                  onClick={openModal}
                >
                  <img src={uploadImage} alt="업로드이미지" />
                  이미지 업로드하기
                </Button>
              </div>
            </div>
          </div>
        </div>
        <CheckButton disabled={!isValid} />
      </form>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <ImgModal closeModal={closeModal} />
      </Modal>
    </>
  );
};
export default Description;
