import { useForm } from 'react-hook-form';
import uploadBox from '@/assets/icons/uploadBox.png';
import message from '@/assets/icons/message-smile-square-black.svg';
import Button from '@/components/common/Button';
import NumberInputBox from '@/components/common/NumberInputBox';

type OptionModalForm = {
  img: File;
  title: string;
  content: string;
  maximum: number;
  userCount: number;
  price: number;
  start: number;
  end: number;
};

type ModalProps = {
  closeModal: () => void;
  optionList: any;
  setOptionList: any;
};

const OptionModal = ({ closeModal, optionList, setOptionList }: ModalProps) => {
  const { register, handleSubmit } = useForm<OptionModalForm>({
    mode: 'onChange',
  });
  const trueButton = true;

  const onSubmit = (data: any) => {
    setOptionList([
      ...optionList,
      [
        data.img[0],
        data.title,
        data.maximum,
        data.userCount,
        data.price,
        data.start,
        data.end,
        data.content,
      ],
    ]);
    closeModal();
  };

  return (
    <div className="w-384 h-532">
      <h1 className="font-semibold text-16 mb-6">옵션추가하기(체험)</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 체험 옵션 input */}
        <div className="flex flex-col gap-12">
          <label htmlFor="uploadBox">
            <img
              className="cursor-pointer w-60 m-auto"
              src={uploadBox}
              alt="플러스 아이콘"
            />
            <input
              className="hidden"
              id="uploadBox"
              {...register('img')}
              type="file"
              accept="image/*"
            />
          </label>
          <label className="flex gap-6 flex-col" htmlFor="title">
            <p className="font-semibold text-14">체험 상품명</p>
            <input
              className="w-full h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('title')}
              placeholder="상품옵션의 이름을 적어주세요.(50자)"
              id="title"
              type="text"
              maxLength={50}
            />
          </label>
          <label className="flex gap-6 flex-col" htmlFor="content">
            <p className="font-semibold text-14">세부 상품 설명</p>
            <textarea
              className="w-full resize-none h-96 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('content')}
              placeholder="등록할 상품옵션의 설명을 적어주세요.(300자)"
              id="content"
              maxLength={300}
            />
          </label>
          <div className="relative w-full flex justify-between gap-6">
            <NumberInputBox
              register={register('maximum', {
                valueAsNumber: true,
              })}
              labelname="예약가능인원"
              inputstyle="w-full"
              numberBox="maximum"
              unit="명"
              placeholder="999"
              max={999}
            />
            <NumberInputBox
              register={register('userCount', {
                valueAsNumber: true,
              })}
              labelname="티켓 갯수"
              inputstyle="w-full"
              numberBox="maximum"
              unit="개"
              placeholder="999"
              max={999}
            />
            <NumberInputBox
              register={register('price', {
                valueAsNumber: true,
              })}
              labelname="가격"
              inputstyle="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              divstyle="w-full"
              numberBox="price"
              unit="원"
              placeholder="1000000"
            />
          </div>
          <div className="w-full flex items-center justify-between gap-6">
            <NumberInputBox
              register={register('start', {
                valueAsNumber: true,
              })}
              labelname="시작 시간"
              inputstyle="w-full"
              numberBox="start"
              unit="시"
              placeholder="0"
              max={23}
            />
            <NumberInputBox
              register={register('end', {
                valueAsNumber: true,
              })}
              labelname="종료 시간"
              inputstyle="w-full"
              numberBox="end"
              unit="시"
              placeholder="23"
              max={23}
            />
            <div className="w-1/2 flex flex-col items-center gap-1 mt-10">
              <img className="m-auto" src={message} alt="설명메세지" />
              <p className="text-9 text-black-6">체험에는 시작시간과</p>
              <p className="text-9 text-black-6">종료시간이 필요합니다.</p>
            </div>
          </div>
        </div>
        <div className="w-383 absolute bottom-32 flex justify-center gap-12">
          <div className="w-166">
            <Button
              buttonStyle="h-28"
              outlined={trueButton}
              buttonType="button"
              onClick={closeModal}
            >
              취소
            </Button>
          </div>
          <div className="w-166">
            <Button buttonStyle="h-28" buttonType="submit">
              완료
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OptionModal;
