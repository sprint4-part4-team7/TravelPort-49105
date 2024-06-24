import { useForm } from 'react-hook-form';
import uploadBox from '@/assets/icons/uploadBox.png';
import message from '@/assets/icons/messageSmileSquareBlack.svg';
import Button from '@/components/common/button/Button';
import NumberInputBox from '@/components/common/input/NumberInputBox';

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
  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<OptionModalForm>({
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
      <h1 className="mb-6 font-semibold text-16">
        {localStorage.getItem('categoryId') === '1'
          ? '옵션추가하기(숙소)'
          : '옵션추가하기(체험)'}
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-12">
          <label htmlFor="uploadBox">
            <img
              className="m-auto cursor-pointer w-60"
              src={uploadBox}
              alt="플러스 아이콘"
            />
            <input
              className="hidden"
              id="uploadBox"
              {...register('img', { required: true })}
              type="file"
              accept="image/*"
            />
          </label>
          <label className="flex flex-col gap-6" htmlFor="title">
            <p className="font-semibold text-14">체험 상품명</p>
            <input
              className="w-full h-48 p-12 border-solid rounded outline-none text-16 border-1 border-black-5 focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('title', { required: true })}
              placeholder="상품옵션의 이름을 적어주세요.(50자)"
              id="title"
              type="text"
              maxLength={50}
            />
          </label>
          <label className="flex flex-col gap-6" htmlFor="content">
            <p className="font-semibold text-14">세부 상품 설명</p>
            <textarea
              className="w-full p-12 border-solid rounded outline-none resize-none h-96 text-16 border-1 border-black-5 focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('content', { required: true })}
              placeholder="등록할 상품옵션의 설명을 적어주세요.(300자)"
              id="content"
              maxLength={300}
            />
          </label>
          <div className="relative flex justify-between w-full gap-6">
            <NumberInputBox
              register={register('maximum', {
                valueAsNumber: true,
                required: true,
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
                required: true,
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
                required: true,
              })}
              labelname="가격"
              inputstyle="w-full [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              divstyle="w-full"
              numberBox="price"
              unit="원"
              placeholder="1000000"
            />
          </div>
          {localStorage.getItem('categoryId') === '1' ? (
            ''
          ) : (
            <div className="flex items-center justify-between w-full gap-6">
              <NumberInputBox
                register={register('start', {
                  valueAsNumber: true,
                  required: true,
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
                  required: true,
                })}
                labelname="종료 시간"
                inputstyle="w-full"
                numberBox="end"
                unit="시"
                placeholder="23"
                max={23}
              />
              <div className="flex flex-col items-center w-1/2 gap-1 mt-10">
                <img className="m-auto" src={message} alt="설명메세지" />
                <p className="text-9 text-black-6">체험에는 시작시간과</p>
                <p className="text-9 text-black-6">종료시간이 필요합니다.</p>
              </div>
            </div>
          )}
        </div>
        <div className="absolute flex justify-center gap-12 w-383 bottom-32">
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
            <Button buttonStyle="h-28" buttonType="submit" disabled={!isValid}>
              완료
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default OptionModal;
