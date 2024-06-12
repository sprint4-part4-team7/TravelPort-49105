import { useForm } from 'react-hook-form';
// import CheckButton from './CheckButton';

type DescriptionForm = {
  title: string;
  content: string;
};

const Description = () => {
  const { register } = useForm<DescriptionForm>({ mode: 'onChange' });
  return (
    <form>
      <div className="mx-40 flex flex-col gap-24">
        <label className="flex gap-12 flex-col" htmlFor="title">
          <p className="text-17">제목</p>
          <input
            className="h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
            {...register('title')}
            placeholder="등록할 제목(상품명)을 입력해주세요."
            id="title"
            type="text"
          />
        </label>
        <label className="flex gap-12 flex-col" htmlFor="content">
          <p className="text-17">내용</p>
          <textarea
            className="resize-none h-216 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
            {...register('content')}
            placeholder="등록할 상품의 전체적인 설명을 적어주세요.(1,000자)"
            id="content"
            maxLength={1000}
          />
        </label>
      </div>
      {/* <CheckButton disabled={disabled} /> */}
    </form>
  );
};
export default Description;
