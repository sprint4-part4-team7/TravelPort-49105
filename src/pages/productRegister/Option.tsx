import { useState } from 'react';
import plusImage from '@/assets/icons/plus-white.svg';
import useModal from '@/hooks/useModal';
import trashImage from '@/assets/icons/trash-red.svg';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import OptionModal from './OptionModal';

const Option = () => {
  const { isModalOpen, openModal, closeModal } = useModal();

  const [optionList, setOptionList] = useState([]);
  console.log(optionList);

  return (
    <div className="mx-40 flex flex-col">
      <table className="table-auto w-full">
        <thead>
          <tr className="flex justify-center gap-20 text-17 p-12">
            <th className="flex-1">대표이미지</th>
            <th className="flex-1">체험상품명</th>
            <th className="flex-1">가능인원</th>
            <th className="flex-1">티켓갯수</th>
            <th className="flex-1">가격</th>
            <th className="flex-1">시작시간</th>
            <th className="flex-1">종료시간</th>
            <th className="flex-1">상품설명</th>
            <th className="flex-1">삭제</th>
          </tr>
        </thead>
        <tbody>
          {optionList.map((i: any, index: number) => (
            <tr className="flex bg-black-2 p-12 gap-20 items-center justify-center text-16">
              <td aria-label="img" className="flex flex-1 justify-center">
                <img
                  className="w-60 h-60"
                  src={URL.createObjectURL(i[0])}
                  alt="상품옵션"
                />
              </td>
              <td aria-label="title" className="flex-1">
                <input
                  className="w-full text-center"
                  type="text"
                  value={i[1]}
                  readOnly
                />
              </td>
              <td aria-label="maximum" className="flex-1">
                <input
                  className="w-full text-center"
                  type="text"
                  value={`${i[2]}명`}
                  readOnly
                />
              </td>
              <td aria-label="userCount" className="flex-1">
                <input
                  className="w-full text-center"
                  type="text"
                  value={`${i[3]}개`}
                  readOnly
                />
              </td>
              <td aria-label="price" className="flex-1">
                <input
                  className="w-full text-center"
                  type="text"
                  value={`${i[4]}원`}
                  readOnly
                />
              </td>
              <td aria-label="start" className="flex-1">
                <input
                  className="w-full text-center"
                  type="text"
                  value={`${i[5]}시`}
                  readOnly
                />
              </td>
              <td aria-label="end" className="flex-1">
                <input
                  className="w-full text-center"
                  type="text"
                  value={`${i[6]}시`}
                  readOnly
                />
              </td>
              <td aria-label="content" className="flex-1">
                <input
                  className="w-full text-center"
                  type="text"
                  value={i[7]}
                  readOnly
                />
              </td>
              <td aria-label="content" className="flex flex-1 justify-center">
                <img
                  src={trashImage}
                  alt="삭제 아이콘"
                  role="presentation"
                  onClick={() => {
                    const temp = [...optionList];
                    temp.splice(index, 1); // 배열에서 선택한 인덱스를 삭제해서 배열을 재정의
                    setOptionList(temp); // 재정의된 배열을 set안에 넣어서 재정의+state변환
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-148 mt-4">
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
    </div>
  );
};

export default Option;
