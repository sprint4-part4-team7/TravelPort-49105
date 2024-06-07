/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { useForm } from 'react-hook-form';
import { getDefaultOption, postReview } from '@/apis/review';
import React, { useEffect, useState } from 'react';
import TextBox from '@/components/common/TextBox';
import ReviewStar from '@/components/review/ReviewStar';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/review/ImageUpload';

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
      reviewImages: [] as any,
    },
  });

  const [option, setOption] = useState('');
  const [product, setProduct] = useState('');

  useEffect(() => {
    const fetchDefaultOption = async (optionId: number) => {
      const { optionName, productName } = await getDefaultOption(optionId);
      setOption(optionName);
      setProduct(productName);
    };
    fetchDefaultOption(1);
  }, [option, product]);

  const onSubmit = async (data: any) => {
    try {
      await postReview(1, 1, data); // 임시
    } catch (error) {
      console.log(error);
    }
    // console.log({ ...data });
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

  const handleImageChange = (selectedImages: string[]) => {
    setValue('reviewImages', selectedImages);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-40 max-w-784 mx-auto">
      <h1 className="py-20 text-24 font-bold">리뷰 작성하기</h1>
      <hr />
      <div className="my-20 flex flex-col gap-20">
        <div className="text-17 font-bold">
          상품 이름 <span className="font-normal">{product}</span>
        </div>
        <div className="text-17 font-bold">
          옵션 <span className="font-normal">{option}</span>
        </div>
      </div>
      <hr />
      <div className="text-18 font-bold my-40">
        <h1 className="mb-20">STEP1 별점을 입력해주세요</h1>
        <ReviewStar onChange={handleScoreChange} />
        {errors.score && (
          <p className="text-[#FF4D4F] text-[1.2rem] mt-[0.4rem]">
            {errors.score.message}
          </p>
        )}
      </div>
      <div className="mb-40">
        <TextBox
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
      <h1 className="text-18 font-bold my-20">
        STEP3 사진을 추가하기 (최대 5장)
      </h1>
      <ImageUpload onChange={handleImageChange} />
      <div className="mt-60">
        <Button text="등록하기" onClick={handleSubmit(onSubmit)} />
      </div>
    </form>
  );
};

export default ReviewRegister;
