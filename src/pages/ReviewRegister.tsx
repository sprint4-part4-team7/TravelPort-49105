/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import useModal from '@/hooks/useModal';
import { useNavigate } from 'react-router-dom';
import useReviewDefaults from '@/hooks/useReviewDefaults';
import productOption from '@/apis/productOption';
import useProductOptionQuery from '@/hooks/reactQuery/productOption/useProductOptionQuery';
import useReviewPostMutation from '@/hooks/reactQuery/review/useReviewPostMutation';
import TextBox from '@/components/common/TextBox';
import ReviewStar from '@/components/review/ReviewStar';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/review/ImageUpload';
import Modal from '@/components/common/Modal';
import Loading from '@/components/common/Loading';

interface ReviewRegisterProps {
  optionId: number;
}
const ReviewRegister = ({ optionId }: ReviewRegisterProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    watch,
    setError,
  } = useForm({
    defaultValues: {
      reviewContent: '',
      score: 0,
      reviewImages: [] as string[],
    },
  });

  const [postImages, setPostImages] = useState<(null | File)[]>([]);

  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const { productOption, optionTitle, productName } =
    useReviewDefaults(optionId);
  const { mutate, isLoading } = useReviewPostMutation();
  const userId = 3;

  if (isLoading) return <Loading />;

  const onSubmit = async (data: any) => {
    // mutate({
    //   userId,
    //   productOptionId: optionId,
    //   productId: productOption.product.productId,
    //   reviewInfo: data,
    // });
    const filteredPostImages = postImages.filter((image) => image !== null);
    data.reviewImages = filteredPostImages;
    console.log({ ...data });
    closeModal();
  };

  const handleScoreChange = React.useCallback((selectedScore: number) => {
    if (!selectedScore)
      setError('score', {
        type: 'custom',
        message: '필수 입력 사항입니다.',
      });
    else {
      setValue('score', selectedScore);
      clearErrors('score');
    }
  }, []);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('reviewContent', e.target.value);
    if (e.target.value) clearErrors('reviewContent');
  };

  const handleImageChange = (
    selectedImages: string[],
    postImageArr: (null | File)[],
  ) => {
    setValue('reviewImages', selectedImages);
    setPostImages(postImageArr);
  };

  const handleFormSubmit = () => {
    // 입력 검증이 성공하면 모달창 열기
    if (!errors.score && !errors.reviewContent) {
      openModal();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="mx-auto mt-40 max-w-784"
    >
      <h1 className="py-20 font-bold text-24">리뷰 작성하기</h1>
      <hr />
      <div className="flex flex-col gap-20 my-20">
        <div className="font-bold text-17">
          상품 이름 <span className="font-normal">{productName}</span>
        </div>
        <div className="font-bold text-17">
          옵션 <span className="font-normal">{optionTitle}</span>
        </div>
      </div>
      <hr />
      <div className="my-40 font-bold text-18">
        <h1 className="mb-20">STEP1 별점을 입력해주세요</h1>
        <ReviewStar onChange={handleScoreChange} />
        {errors.score && (
          <p className="text-[#FF4D4F] text-12 mt-4">{errors.score.message}</p>
        )}
      </div>
      <div className="mb-40">
        <TextBox
          id="review"
          labelName="STEP2 리뷰를 입력해주세요"
          textSize={18}
          mb={20}
          textLimit={100}
          placeholder="리뷰를 작성하세요."
          value={watch('reviewContent')}
          register={register('reviewContent', {
            required: '필수 입력 사항입니다.',
          })}
          onChange={handleContentChange}
          error={errors.reviewContent}
        />
      </div>
      <h1 className="my-20 font-bold text-18">
        STEP3 사진을 추가하기 (최대 5장)
      </h1>
      <ImageUpload onChange={handleImageChange} />
      <div className="mt-60">
        <Button buttonType="submit">등록하기</Button>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="p-16">리뷰를 등록하시겠습니까?</div>
        <Button
          onClick={() => {
            handleSubmit(onSubmit)();
            closeModal();
            navigate('/');
          }}
        >
          확인
        </Button>
      </Modal>
    </form>
  );
};

export default ReviewRegister;
