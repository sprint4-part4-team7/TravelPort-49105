import { useForm } from 'react-hook-form';
// import { useState } from 'react';
import { PageIdProps } from './productPage';
import Location from './Location';
import CheckButton from './CheckButton';

type DescriptionForm = {
  title: string;
  content: string;
};

const Description = ({ setPage }: PageIdProps) => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<DescriptionForm>({
    mode: 'onChange',
  });

  const onSubmit = (data: DescriptionForm) => {
    setPage(<Location setPage={setPage} />);
    console.log(data);
    // if (data.category === '숙박') {
    //   localStorage.setItem('categoryId', '3'); // 서버 바뀌면 1
    // } else if (data.category === '체험') {
    //   localStorage.setItem('categoryId', '20'); // 서버 바뀌면 2
    // }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mx-40 flex flex-col gap-24">
        <label className="flex gap-12 flex-col" htmlFor="title">
          <p className="text-17">제목</p>
          <input
            className="h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
            {...register('title', {
              required: true,
            })}
            placeholder="등록할 제목(상품명)을 입력해주세요."
            id="title"
            type="text"
          />
        </label>
        <label className="flex gap-12 flex-col" htmlFor="content">
          <p className="text-17">내용</p>
          <textarea
            className="resize-none h-216 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
            {...register('content', {
              required: true,
            })}
            placeholder="등록할 상품의 전체적인 설명을 적어주세요.(1,000자)"
            id="content"
            maxLength={1000}
          />
        </label>
      </div>
      <CheckButton disabled={!isValid} />
    </form>
  );
};
export default Description;
