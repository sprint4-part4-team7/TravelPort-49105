/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import useModal from '@/hooks/useModal';
import { useNavigate } from 'react-router-dom';
import useReviewDefaults from '@/hooks/review/useReviewDefaults';
import useReviewPostMutation from '@/hooks/reactQuery/review/useReviewPostMutation';
import useReviewPutMutation from '@/hooks/reactQuery/review/useReviewPutMutation';
import BUCKER_NAME from '@/constants/Bucket';
import postImages from '@/apis/image';
import { useUserStore } from '@/utils/Zustand';
import useProductReview from '@/hooks/review/useProductReview';
import useGetUserIdByReviewId from '@/hooks/review/useGetUserIdByReviewId';
import { toast } from 'react-toastify';
import TextBox from '@/components/common/input/TextBox';
import ReviewStar from '@/components/review/ReviewStar';
import Button from '@/components/common/button/Button';
import ImageUpload from '@/components/review/ImageUpload';
import Modal from '@/components/common/modal/Modal';
import Loading from '@/components/common/Loading';
import DefaultModal from '@/components/common/modal/DefaultModal';

interface ReviewRegisterProps {
  optionId: number;
  reviewId?: number;
}
const ReviewRegister = ({ optionId, reviewId = 0 }: ReviewRegisterProps) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
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

  const [postingImages, setPostingImages] = useState<(null | File)[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [initialImages, setInitialImages] = useState<(null | string)[]>(
    Array(5).fill(null),
  );

  const { isModalOpen, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const { productOption, optionTitle, productName, productId } =
    useReviewDefaults(optionId);
  const { mutate: createReview, isLoading: isCreating } =
    useReviewPostMutation();
  const { mutate: updateReview, isLoading: isUpdating } =
    useReviewPutMutation();
  const { userInfo } = useUserStore();
  const userId = userInfo.id;
  const { productReviews } = useProductReview(productId);
  const { uId, isLoadingReview, reviewError } =
    useGetUserIdByReviewId(reviewId);

  useEffect(() => {
    if (reviewId && !isLoadingReview && uId) {
      if (uId !== userId) {
        navigate('/');
        toast.error('접근 권한이 없습니다.');
      } else {
        for (let i = 0; i < productReviews?.length; i++) {
          if (productReviews[i].userId === userInfo.id) {
            setValue('score', productReviews[i].score);
            setValue('reviewContent', productReviews[i].reviewContent);
            setValue('reviewImages', productReviews[i].reviewImages);
            const initialImagesArray = new Array(5).fill(null);
            for (let j = 0; j < productReviews[i].reviewImages.length; j++) {
              initialImagesArray[j] = productReviews[i].reviewImages[j];
            }
            setInitialImages(initialImagesArray);
            setIsEditMode(true);
          }
        }
      }
    } else if (uId) {
      navigate('/');
      toast.error('접근 권한이 없습니다.');
    }
  }, [
    reviewId,
    uId,
    isLoadingReview,
    userId,
    productReviews,
    setValue,
    navigate,
  ]);

  // 버튼 활성화 여부 조절
  const [isDisableToSubmit, setIsDisableToSubmit] = useState(true);
  useEffect(() => {
    if (getValues('score') !== 0 && getValues('reviewContent') !== '')
      setIsDisableToSubmit(false);
    else setIsDisableToSubmit(true);
  }, [errors, getValues('score'), getValues('reviewContent')]);

  if (isCreating || isUpdating) {
    return <Loading />;
  }

  // 이미지 업로드 함수
  const handleUpload = async () => {
    // 이미지 배열과 버켓 이름을 인자로 넘겨 업로드하고
    // 반환되는 배열에 담긴 이미지 주소를 이용하자!
    // response에 url 배열이 담김
    const filteredPostImages = postingImages.filter(
      (image): image is File => image !== null,
    );
    const response = await postImages(filteredPostImages, BUCKER_NAME.REVIEW);
    return response;
    // 참고로 이미지 순서는 배열로 보낸 순서대로 반환됨
  };

  const onSubmit = async (data: any) => {
    const postedImages = await handleUpload();
    data.reviewImages = postedImages;

    if (isEditMode && reviewId) {
      updateReview({
        userId,
        productOptionId: optionId,
        reviewId,
        reviewInfo: data,
      });
    } else {
      createReview({
        userId,
        productOptionId: optionId,
        productId: productOption.product.id,
        reviewInfo: data,
      });
    }
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
    selectedImages: (string | null)[],
    postImageArr: (null | File)[],
  ) => {
    const filteredSelectedImages: string[] = selectedImages.filter(
      (image): image is string => image !== null,
    );
    setValue('reviewImages', filteredSelectedImages);
    setPostingImages(postImageArr);
  };

  const handleFormSubmit = () => {
    // 입력 검증이 성공하면 모달창 열기
    if (!errors.score && !errors.reviewContent) {
      openModal();
    }
  };

  const submitButtonText = isEditMode ? '수정하기' : '등록하기';

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
        <ReviewStar
          onChange={handleScoreChange}
          initialScore={getValues('score')}
        />
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
      <ImageUpload onChange={handleImageChange} initialImages={initialImages} />
      <div className="mt-60">
        <Button buttonType="submit" disabled={isDisableToSubmit}>
          {submitButtonText}
        </Button>
      </div>
      <DefaultModal
        title="리뷰를 등록하시겠습니까?"
        isOpen={isModalOpen}
        closeModal={closeModal}
        onConfirm={() => {
          handleSubmit(onSubmit)();
          closeModal();
          navigate('/');
        }}
      />
    </form>
  );
};

export default ReviewRegister;
