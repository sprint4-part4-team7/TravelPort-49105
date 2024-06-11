import { useForm } from 'react-hook-form';
import NumberInputBox from '@/components/common/NumberInputBox';

type OptionForm = {
  title: string;
  content: string;
};

const Option = () => {
  const { register } = useForm<OptionForm>({ mode: 'onChange' });
  return (
    <form>
      <div className="mx-40 flex flex-col gap-12">
        <div className="flex gap-12">
          <label className="flex gap-12 flex-col" htmlFor="title">
            <p className="text-17">세부 상품명</p>
            <input
              className="h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('title')}
              placeholder="등록할 상품옵션의 이름을 적어주세요."
              id="title"
              type="text"
            />
          </label>
          <NumberInputBox numberBox="명" unit="최대 인원" placeholder="232" />
          <NumberInputBox numberBox="원" unit="가격" placeholder="2" />
          {/* 체험만 필요 */}
          <NumberInputBox numberBox="명" unit="최소 인원" placeholder="2" />
          <NumberInputBox numberBox="시" unit="시작 시간" placeholder="19" />
          <NumberInputBox numberBox="시" unit="종료 시간" placeholder="19" />
        </div>
        <label className="flex gap-12 flex-col" htmlFor="content">
          <p className="text-17">상품 설명</p>
          <textarea
            className="h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
            {...register('content')}
            placeholder="등록할 상품옵션의 설명을 적어주세요.(300자)"
            id="content"
            maxLength={300}
          />
        </label>
      </div>
    </form>
  );
};
export default Option;
