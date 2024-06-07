import { useForm } from 'react-hook-form';
import React, { Dispatch, SetStateAction, useState } from 'react';
import CheckButton from './CheckButton';
import Description from './Description';

type CategoryForm = {
  category: string;
};

type CategoryIdProps = {
  setPage: Dispatch<SetStateAction<React.ReactNode>>;
};

const Category = ({ setPage }: CategoryIdProps) => {
  const { register, handleSubmit, watch } = useForm<CategoryForm>({
    mode: 'onChange',
  });

  const preCategoryValue = watch('category'); // register의 category값을 감시(숙박input이 들어가나, 체험input이들어가나)

  const [disabled, setDisabled] = useState(true); // [버튼] disabled 된게 초기설정

  const onSubmit = (data: CategoryForm) => {
    setPage(<Description />);
    console.log(data);
  };

  // [버튼] input 클릭시 abled
  const handleButton = () => {
    if (preCategoryValue !== 'undefined') {
      setDisabled(false);
    }
  };

  return (
    <div className="flex flex-col gap-32">
      <h3 className="mb-5 text-17 font-semiblod text-black-10">
        상품 유형을 골라주세요.
      </h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ul className="grid w-full gap-20 md:grid-cols-2">
          <li>
            <label
              htmlFor="accommodation"
              className="inline-flex items-center justify-between w-full p-5 text-black-6 bg-white border border-dashed border-black-6 rounded-lg cursor-pointer has-[:checked]:border-blue-6 has-[:checked]:text-blue-6 hover:text-black-7 hover:bg-black-2 dark:text-black-5"
            >
              <input
                {...register('category')}
                type="radio"
                id="accommodation"
                name="category"
                value="숙박"
                className="hidden"
                required
                checked={preCategoryValue === '숙박'}
                onClick={handleButton}
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
                {...register('category')}
                type="radio"
                id="attraction"
                name="category"
                value="체험"
                className="hidden"
                checked={preCategoryValue === '체험'}
                onClick={handleButton}
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
        <CheckButton disabled={disabled} />
      </form>
    </div>
  );
};

export default Category;
