import { useForm } from 'react-hook-form';
import React, { useEffect } from 'react';
import CheckButton from './CheckButton';
import Description from './Description';
import { PageIdProps } from './productPage';

type CategoryForm = {
  category: string;
  accommodationOption: string; // 숙소 하위
  attractionOption: string; // 체험 하위
};

const Category = ({ setPage }: PageIdProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { isValid },
  } = useForm<CategoryForm>({
    mode: 'onChange',
  });

  const preCategoryValue = watch('category'); // register의 category값을 감시(숙박input이 들어가나, 체험input이들어가나)

  useEffect(() => {
    if (localStorage.getItem('categoryId') === '1') {
      setValue('category', '숙박'); // setValue를 사용하여 category에 원래있던 기초값을 전달
    } else if (localStorage.getItem('categoryId') === '2') {
      setValue('category', '체험'); // setValue를 사용하여 category에 원래있던 기초값을 전달
    }
  }, []);

  const onSubmit = (data: CategoryForm) => {
    setPage(<Description setPage={setPage} />);
    if (data.category === '숙박') {
      localStorage.setItem('categoryId', '3'); // 서버 바뀌면 1
    } else if (data.category === '체험') {
      localStorage.setItem('categoryId', '20'); // 서버 바뀌면 2
    }
  };

  return (
    <div className="flex flex-col gap-32">
      <h3 className="mx-40 mb-5 text-17 font-semiblod text-black-10">
        상품 유형을 골라주세요.
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="mx-40 grid gap-20 md:grid-cols-2">
          <li>
            <label
              htmlFor="accommodation"
              className="inline-flex items-center justify-between w-full p-5 text-black-6 bg-white border border-dashed border-black-6 rounded-lg cursor-pointer has-[:checked]:border-blue-6 has-[:checked]:text-blue-6 hover:text-black-7 hover:bg-black-2 dark:text-black-5"
            >
              <input
                {...register('category', { required: true })}
                type="radio"
                id="accommodation"
                name="category"
                value="숙박"
                className="hidden"
                checked={preCategoryValue === '숙박'}
              />
              <div className="flex flex-col h-200 p-3 justify-center items-center flex-[1_0_0]">
                <p className="w-full text-22 font-semibold text-center">숙박</p>
                <p className="w-full text-center">
                  호텔, 호스텔, 게스트하우스, 모텔 등
                </p>
              </div>
            </label>
          </li>
          <li>
            <label
              htmlFor="attraction"
              className="inline-flex items-center justify-between w-full p-5 text-black-6 bg-white border border-dashed border-black-6 rounded-lg cursor-pointer has-[:checked]:border-blue-6 has-[:checked]:text-blue-6 hover:text-black-7 hover:bg-black-2 dark:text-black-5"
            >
              <input
                {...register('category', { required: true })}
                type="radio"
                id="attraction"
                name="category"
                value="체험"
                className="hidden"
                checked={preCategoryValue === '체험'}
              />
              <div className="flex flex-col h-200 p-3 justify-center items-center flex-[1_0_0]">
                <p className="w-full text-22 font-semibold text-center">체험</p>
                <p className="w-full text-center">
                  스카이다이빙, 관광지, 도자기 공예, 원예 체험 등
                </p>
              </div>
            </label>
          </li>
        </ul>
        {/* 하위옵션선택 따로 컴포넌트화 하기 그리고 삼항연산자까지 고려해야함 */}
        <div>
          <h3 className="mx-40 mb-5 text-17 font-semiblod text-black-10">
            숙박 옵션을 선택해주세요.
          </h3>
          {/* 숙박 하위 옵션 선택 */}
          <label htmlFor="hotel">
            <input
              {...register('accommodationOption')}
              type="radio"
              id="hotel"
              name="accommodationOption"
              value="호텔"
            />
            <p>호텔</p>
          </label>
          <label htmlFor="guestHouse">
            <input
              {...register('accommodationOption')}
              type="radio"
              id="guestHouse"
              name="accommodationOption"
              value="게스트하우스"
            />
            <p>게스트하우스</p>
          </label>
          <label htmlFor="campsite">
            <input
              {...register('accommodationOption')}
              type="radio"
              id="campsite"
              name="accommodationOption"
              value="캠핑장/야영장"
            />
            <p>캠핑장/야영장</p>
          </label>
          <label htmlFor="poolVilla">
            <input
              {...register('accommodationOption')}
              type="radio"
              id="poolVilla"
              name="accommodationOption"
              value="풀빌라"
            />
            <p>풀빌라</p>
          </label>
          <label htmlFor="pension">
            <input
              {...register('accommodationOption')}
              type="radio"
              id="pension"
              name="accommodationOption"
              value="펜션"
            />
            <p>펜션</p>
          </label>
          <label htmlFor="etc">
            <input
              {...register('accommodationOption')}
              type="radio"
              id="etc"
              name="accommodationOption"
              value="기타"
            />
            <p>기타</p>
          </label>
        </div>
        <div>
          <h3 className="mx-40 mb-5 text-17 font-semiblod text-black-10">
            체험 옵션을 선택해주세요.
          </h3>
          {/* 체험 하위 옵션 선택 */}
          <label htmlFor="themePark">
            <input
              {...register('attractionOption')}
              type="radio"
              id="themePark"
              name="attractionOption"
              value="테마파크"
            />
            <p>테마파크</p>
          </label>
          <label htmlFor="water">
            <input
              {...register('attractionOption')}
              type="radio"
              id="water"
              name="attractionOption"
              value="수상액티비티"
            />
            <p>수상액티비티</p>
          </label>
          <label htmlFor="leisure">
            <input
              {...register('attractionOption')}
              type="radio"
              id="leisure"
              name="attractionOption"
              value="레저스포츠"
            />
            <p>레저스포츠</p>
          </label>
          <label htmlFor="show">
            <input
              {...register('attractionOption')}
              type="radio"
              id="show"
              name="attractionOption"
              value="공연/전시"
            />
            <p>공연/전시</p>
          </label>
          <label htmlFor="class">
            <input
              {...register('attractionOption')}
              type="radio"
              id="class"
              name="attractionOption"
              value="체험/클래스"
            />
            <p>체험/클래스</p>
          </label>
          <label htmlFor="etc">
            <input
              {...register('attractionOption')}
              type="radio"
              id="etc"
              name="attractionOption"
              value="기타"
            />
            <p>기타</p>
          </label>
        </div>
        <CheckButton disabled={!isValid} />
      </form>
    </div>
  );
};

export default Category;
