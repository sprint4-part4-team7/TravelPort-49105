/* eslint-disable no-undef */
import { useForm } from 'react-hook-form';
import postReview from '@/apis/register';
import TextBox from '@/components/common/TextBox';
import ReviewStar from '@/components/review/ReviewStar';
import Button from '@/components/common/Button';
import ImageUpload from '@/components/common/ImageUpload';

const ReviewRegister = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    clearErrors,
    watch,
  } = useForm({
    defaultValues: { reviewContent: '', reviewScore: 0 },
  });

  const onSubmit = async (data: any) => {
    try {
      await postReview(1, 11, 111, data); // 임시
    } catch (error) {
      console.log(error);
    }
  };

  const handleScoreChange = (selectedScore: number) => {
    setValue('reviewScore', selectedScore);
  };
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue('reviewContent', e.target.value);
    if (e.target.value) clearErrors('reviewContent');
  };

  const name = '시그니엘';
  const optionName = '디럭스룸';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-30">
        <div className="text-[2rem] font-bold">
          상품 이름 <span className="font-normal">{name}</span>
        </div>
        <div className="text-[2rem] font-bold">
          옵션 <span className="font-normal">{optionName}</span>
        </div>
      </div>
      <div className="text-[1.9rem] font-bold mb-30">
        <h1>별점을 입력해주세요.</h1>
        <ReviewStar onChange={handleScoreChange} />
      </div>
      <div className="mb-30">
        <TextBox
          labelName="리뷰를 입력해주세요."
          textLimit={100}
          placeholder="리뷰를 작성하세요."
          value={watch('reviewContent')}
          register={register('reviewContent', {
            required: '필수 입력 사항입니다.',
          })}
          onChange={handleContentChange}
        />
        {errors?.reviewContent && (
          <p className="text-[#FF4D4F] text-[1.2rem] mt-[0.4rem]">
            {errors?.reviewContent?.message}
          </p>
        )}
      </div>
      <ImageUpload />
      <Button text="리뷰 등록하기" onClick={handleSubmit(onSubmit)} />
    </form>
  );
};

export default ReviewRegister;
