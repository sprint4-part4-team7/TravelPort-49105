import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import uploadImage from '@/assets/icons/upload.svg';
import useModal from '@/hooks/useModal';
import { useThumbnailStore } from '@/utils/Zustand';
import { PageIdProps } from './productPage';
import Location from './Location';
import CheckButton from './CheckButton';
import Button from '@/components/common/button/Button';
import Modal from '@/components/common/modal/Modal';
import ImgModal from './ImgModal';

type DescriptionForm = {
  title: string;
  content: string;
  img: File;
};

const Description = ({ setPage, setActiveStep }: PageIdProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isValid },
  } = useForm<DescriptionForm>({
    mode: 'onChange',
  });

  const outlined = true;

  const { isModalOpen, openModal, closeModal } = useModal();
  const { thumbnail } = useThumbnailStore();
  const [showImg, setShowImg] = useState('');

  useEffect(() => {
    const optionTitle = localStorage.getItem('title');
    if (optionTitle) {
      setValue('title', optionTitle);
    }
    const optionContent = localStorage.getItem('content');
    if (optionContent) {
      setValue('content', optionContent);
    }
  }, []);

  useEffect(() => {
    if (thumbnail.size > 0) {
      setShowImg(URL.createObjectURL(thumbnail));
    }
  }, [thumbnail]);

  const onSubmit = (data: DescriptionForm) => {
    localStorage.setItem('title', data.title);
    localStorage.setItem('content', data.content);
    setActiveStep(3);
    setPage(<Location setPage={setPage} setActiveStep={setActiveStep} />);
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-24 mx-40">
          <label className="flex flex-col gap-12" htmlFor="title">
            <p className="font-semibold text-17">제목</p>
            <input
              className="w-full h-48 p-12 border-solid rounded outline-none text-16 border-1 border-black-5 focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('title', {
                required: true,
              })}
              placeholder="등록할 제목(상품명)을 입력해주세요.(50자)"
              id="title"
              type="text"
              maxLength={50}
            />
          </label>
          <label className="flex flex-col gap-12" htmlFor="content">
            <p className="font-semibold text-17">내용</p>
            <textarea
              className="w-full p-12 border-solid rounded outline-none resize-none h-216 text-16 border-1 border-black-5 focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('content', {
                required: true,
              })}
              placeholder="등록할 상품의 전체적인 설명을 적어주세요.(1,000자)"
              id="content"
              maxLength={1000}
            />
          </label>
          <div className="flex flex-col gap-12">
            <p className="font-semibold text-17">이미지 업로드</p>
            <div className="flex flex-row items-center gap-32">
              <label className="flex flex-col items-center gap-8" htmlFor="img">
                {thumbnail.size > 0 ? (
                  <img
                    className="w-120 h-120 rounded-3"
                    src={showImg}
                    alt="썸네일"
                  />
                ) : (
                  <input
                    {...register('img', {
                      required: true,
                    })}
                    className="w-120 h-120 rounded-3 bg-black-4"
                    id="img"
                  />
                )}
                <p className="text-14">대표 이미지</p>
              </label>
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
