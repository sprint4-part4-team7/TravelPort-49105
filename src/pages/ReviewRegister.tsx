/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useForm } from 'react-hook-form';
// import { getDefaultOption } from '@/apis/review';
import React, { useState } from 'react';
import useModal from '@/hooks/useModal';
import { useNavigate } from 'react-router-dom';
import TextBox from '@/components/common/TextBox';
import ReviewStar from '@/components/review/ReviewStar';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/review/ImageUpload';
import Modal from '@/components/common/Modal';

const ReviewRegister = () => {
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

  const [option, setOption] = useState('');
  const [product, setProduct] = useState('');
  const [postImages, setPostImages] = useState<(null | File)[]>([]);

  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();

  // 리액트 쿼리로 사용해야 해서 주석 처리 해놈 !
  // useEffect(() => {
  //   const fetchDefaultOption = async (optionId: number) => {
  //     const { optionName, productName } =
  //       await productOptionApi.getProductOptionByOptionId(optionId);
  //     setOption(optionName);
  //     setProduct(productName);
  //   };
  //   fetchDefaultOption(1); // 추후 옵션아이디로 변경 예정
  // }, []);

  const onSubmit = async (data: any) => {
    // post 정상적으로 작동됨. 추후 userId, optionId로 변경 예정
    // try {
    //   await postReview(1, 1, data); // 임시
    // } catch (error) {
    //   console.log(error);
    // }
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
          상품 이름 <span className="font-normal">{product}</span>
        </div>
        <div className="font-bold text-17">
          옵션 <span className="font-normal">{option}</span>
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
