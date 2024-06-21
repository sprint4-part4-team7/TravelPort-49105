import { useForm } from 'react-hook-form';
import React, { useEffect, useState } from 'react';
import { hotelTypes, ActivityTypes } from '@/constants/CategoryTypes';
import CheckButton from './CheckButton';
import Description from './Description';
import { PageIdProps } from './productPage';

type CategoryForm = {
  category: string;
  accommodationOption: string;
  attractionOption: string;
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

  const [subCategoryValid, setSubCategoryValid] = useState(false);

  const preCategoryValue = watch('category');
  const accommodationOption = watch('accommodationOption');
  const attractionOption = watch('attractionOption');

  useEffect(() => {
    const subCategory = localStorage.getItem('subCategory');
    if (localStorage.getItem('categoryId') === '1') {
      setValue('category', '숙박');
      setValue('accommodationOption', subCategory !== null ? subCategory : '');
    } else if (localStorage.getItem('categoryId') === '2') {
      setValue('category', '체험');
      setValue('attractionOption', subCategory !== null ? subCategory : '');
    }
  }, []);

  useEffect(() => {
    if (preCategoryValue === '숙박') {
      setSubCategoryValid(!!accommodationOption);
    } else if (preCategoryValue === '체험') {
      setSubCategoryValid(!!attractionOption);
    }
  }, [accommodationOption, attractionOption]);

  const onSubmit = (data: CategoryForm) => {
    const subCategory =
      data.category === '숙박'
        ? data.accommodationOption
        : data.attractionOption;

    setPage(<Description setPage={setPage} />);

    if (data.category === '숙박') {
      localStorage.setItem('categoryId', '1');
    } else if (data.category === '체험') {
      localStorage.setItem('categoryId', '2');
    }
    localStorage.setItem('subCategory', subCategory || '');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-12 mx-40">
        <h3 className="text-17 font-semibold text-black-10">
          상품 유형을 골라주세요.
        </h3>
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
        {preCategoryValue === '숙박' && (
          <div>
            <h3 className="mb-12 text-17 font-semibold text-black-10">
              숙박 옵션을 선택해주세요.
            </h3>
            <div className="ml-40 w-full max-w-screen-lg grid grid-cols-2 md:grid-cols-3 desktop:grid-cols-6">
              {hotelTypes.map((type) => (
                <label
                  className="cursor-pointer bg-white/40 hover:bg-white/20 w-100 h-40 p-4 mb-16 rounded-md flex justify-between items-center shadow transition-colors has-[:checked]:bg-blue-6 has-[:checked]:text-white"
                  key={type}
                  htmlFor={type}
                >
                  <div className="flex items-center space-x-5 text-16 font-semibold m-auto">
                    <span className="text-lg">{type}</span>
                  </div>
                  <input
                    {...register('accommodationOption', { required: true })}
                    type="radio"
                    id={type}
                    name="accommodationOption"
                    value={type}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
        {preCategoryValue === '체험' && (
          <div>
            <h3 className="mb-12 text-17 font-semibold text-black-10">
              체험 옵션을 선택해주세요.
            </h3>
            <div className="ml-40 w-full max-w-screen-lg grid grid-cols-2 md:grid-cols-3 desktop:grid-cols-6">
              {ActivityTypes.map((type) => (
                <label
                  className="cursor-pointer bg-white/40 hover:bg-white/20 w-100 h-40 p-4 mb-16 rounded-md flex justify-between items-center shadow transition-colors has-[:checked]:bg-blue-6 has-[:checked]:text-white"
                  key={type}
                  htmlFor={type}
                >
                  <div className="flex items-center space-x-5 text-16 font-semibold m-auto">
                    <span className="text-lg">{type}</span>
                  </div>
                  <input
                    {...register('attractionOption', { required: true })}
                    type="radio"
                    id={type}
                    name="attractionOption"
                    value={type}
                    className="hidden"
                  />
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
      <CheckButton disabled={!isValid || !subCategoryValid} />
    </form>
  );
};

export default Category;
