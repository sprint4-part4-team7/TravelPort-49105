import { getCategory, postCategory, putCategory } from '@/apis/category';
import { useForm } from 'react-hook-form';
import { Dispatch, SetStateAction, useEffect } from 'react';
import CheckButton from './CheckButton';

type CategoryForm = {
  category: string;
};

type CategoryIdProps = {
  categoryId: number;
  setCategoryId: Dispatch<SetStateAction<number>>;
};

const Category = ({ categoryId, setCategoryId }: CategoryIdProps) => {
  const { register, handleSubmit, watch, setValue } = useForm<CategoryForm>({
    mode: 'onChange',
  });

  const preCategoryValue = watch('category'); // register의 category값을 감시(숙박input이 들어가나, 체험input이들어가나)

  const onSubmit = async (data: CategoryForm) => {
    if (categoryId === 0) {
      // 초기에 할때(post)
      const response = await postCategory(data.category);
      setCategoryId(response.id);
    } else {
      // 한번 하고 수정할때(get,put)
      await putCategory(categoryId, data.category);
    }
  };

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId !== 0) {
        const response = await getCategory(categoryId);
        setValue('category', response.name); // setValue를 사용하여 category에 원래있던 기초값을 전달
      }
    };
    fetchCategory();
  }, []);
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
        <CheckButton />
      </form>
    </div>
  );
};

export default Category;
