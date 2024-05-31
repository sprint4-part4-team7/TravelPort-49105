import { useForm } from 'react-hook-form';
import postReview from '@/apis/register';
import TextBox from '@/components/common/TextBox';
import ReviewStar from '@/components/review/ReviewStar';

const ReviewRegister = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data:any) => console.log(data);
  // const onSubmit = () => postReview();
  const name = '시그니엘';
  const optionName = '디럭스룸';

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <div>
          상품 이름 <span>{name}</span>
        </div>
        <div>
          옵션 <span>{optionName}</span>
        </div>
      </div>
      <div>
        <h1>별점을 입력해주세요.</h1>
        <ReviewStar />
      </div>
      <div>
        <TextBox
          labelName="리뷰를 입력해주세요."
          textLimit={100}
          placeholder="리뷰를 작성하세요."
          value=""
          register={register}
          rules={{required: '필수 입력 사항입니다.'}}
          errors={errors}
        />
        {errors.}
      </div>
    </form>
  );
};

export default ReviewRegister;
