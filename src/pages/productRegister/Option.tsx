import { useForm } from 'react-hook-form';
import { useState } from 'react';
import plusImage from '@/assets/icons/plus-white.svg';
import useModal from '@/hooks/useModal';
// import NumberInputBox from '@/components/common/NumberInputBox';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import OptionModal from './OptionModal';

type OptionForm = {
  title: string;
  content: string;
  minimum: number;
  maximum: number;
  price: number;
  start: number;
  end: number;
};

const Option = () => {
  const { register } = useForm<OptionForm>({ mode: 'onChange' });

  const { isModalOpen, openModal, closeModal } = useModal();

  const [optionList, setOptionList] = useState([]);
  console.log(optionList);
  return (
    <>
      <form>
        <div className="mx-40 flex flex-col gap-12">
          <div className="flex gap-12 items-center">
            <label className="flex gap-12 flex-col" htmlFor="title">
              <p className="text-14">세부 상품명</p>
              <input
                className="h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-239 focus:border-blue-6 focus:border-1 mobile:max-w-none"
                {...register('title')}
                placeholder="상품옵션의 이름을 적어주세요."
                id="title"
                type="text"
              />
            </label>
            {/* 체험만 필요 */}
            {/* <NumberInputBox
              {...register('minimum')}
              labelname="최소 인원"
              inputstyle="w-47"
              divstyle="w-90"
              numberBox="minimum"
              unit="명"
              placeholder="2"
            />
            <NumberInputBox
              {...register('maximum')}
              labelname="최대 인원"
              inputstyle="w-47"
              divstyle="w-90"
              numberBox="maximum"
              unit="명"
              placeholder="232"
            />
            <NumberInputBox
              {...register('price')}
              labelname="가격"
              inputstyle="w-77 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              divstyle="w-120"
              numberBox="price"
              unit="원"
              placeholder="20000"
            />
            {/* 체험만 필요 */}
            {/* <NumberInputBox
              {...register('start')}
              labelname="시작 시간"
              inputstyle="w-37"
              divstyle="w-80"
              numberBox="start"
              unit="시"
              placeholder="19"
              max={23}
            /> */}
            {/* 체험만 필요 */}
            {/* <NumberInputBox
              {...register('end')}
              labelname="종료 시간"
              inputstyle="w-37"
              divstyle="w-80"
              numberBox="end"
              unit="시"
              placeholder="19"
              max={23}
            />  */}
          </div>
          <label className="flex gap-12 flex-col" htmlFor="content">
            <p className="text-14">세부 상품 설명</p>
            <textarea
              className="resize-none h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
              {...register('content')}
              placeholder="등록할 상품옵션의 설명을 적어주세요.(300자)"
              id="content"
              maxLength={300}
            />
          </label>
        </div>
      </form>
      <div className="w-148">
        <Button
          buttonType="button"
          buttonStyle="text-16 p-12 flex gap-6 justify-center items-center"
          onClick={openModal}
        >
          <img src={plusImage} alt="+이미지" />
          옵션 추가하기
        </Button>
      </div>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <OptionModal
          closeModal={closeModal}
          optionList={optionList}
          setOptionList={setOptionList}
        />
      </Modal>
    </>
  );
};
export default Option;
