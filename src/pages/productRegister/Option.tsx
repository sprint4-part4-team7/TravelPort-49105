import { useState } from 'react';
import { useProductImageStore, useThumbnailStore } from '@/utils/zustand';
import plusImage from '@/assets/icons/plus-white.svg';
import useModal from '@/hooks/useModal';
import productOption from '@/apis/productOption';
import product from '@/apis/product';
import postImages from '@/apis/image';
import BUCKER_NAME from '@/constants/bucket';
import trashImage from '@/assets/icons/trash-red.svg';
import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import OptionModal from './OptionModal';

const Option = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [optionList, setOptionList] = useState([]);

  const { thumbnail } = useThumbnailStore();
  const { productImages } = useProductImageStore();

  const disabled = false;

  // 이전 페이지에서 저장한 로컬 스토리지 데이터 불러오기
  const name = localStorage.getItem('title');
  const productType = localStorage.getItem('subCategory');
  const productDesc = localStorage.getItem('content');
  const productSiteLat = localStorage.getItem('x');
  const productSiteLng = localStorage.getItem('y');
  const productAddress = localStorage.getItem('addressName');
  const buildingName = localStorage.getItem('buildingName');
  const startDate = localStorage.getItem('startDate');
  const endDate = localStorage.getItem('endDate');
  const holiday = localStorage.getItem('holiday')?.split(',');

  // date를 서버에 넣어주기위해 필요한 형식
  const formatDate = (date: any) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  // console.log(startDate !== null ? formatDate(new Date(startDate)) : '');
  const onSubmitAll = async () => {
    // 여기에 서버로 전송할 데이터를 모두 모아 보냄
    try {
      // 1. 카테고리를 서버에 등록
      const categoryResponse = localStorage.getItem('categoryId');
      const handleUploadThumbnail = async () => {
        const thumbnailResponse = await postImages(
          thumbnail,
          BUCKER_NAME.PRODUCT_PREVIEW,
        );
        return thumbnailResponse;
      };
      const handleUploadProduct = async () => {
        const productImagesResponse = await postImages(
          productImages,
          BUCKER_NAME.ADDITIONAL_PRODUCT,
        );
        return productImagesResponse.data;
      };
      // 로컬에서 받아오는 데이터
      const productInfo = {
        name: name !== null ? name : '', // 상품명을 여기에 입력
        productType: productType !== null ? productType : '', // 상품 타입, 여러 개의 타입이면 배열로 전달
        productDesc: productDesc !== null ? productDesc : '', // 상품 설명
        productSiteLat:
          productSiteLat !== null ? parseFloat(productSiteLat) : 0, // 상품 위치의 위도
        productSiteLng:
          productSiteLng !== null ? parseFloat(productSiteLng) : 0, // 상품 위치의 경도
        productAddress: productAddress !== null ? productAddress : '', // 상품 주소
        buildingName: buildingName !== null ? buildingName : '', // 건물 이름
        thumbnail: await handleUploadThumbnail(), // 썸네일 이미지 URL
        productImages: await handleUploadProduct(), // 상품 이미지들의 URL 배열
        startDate: startDate !== null ? formatDate(new Date(startDate)) : '', // 시작 날짜 (예: '2024-06-18')
        endDate: endDate !== null ? formatDate(new Date(endDate)) : '', // 종료 날짜 (예: '2024-06-20')
        closedDay: holiday !== undefined ? holiday : [''], // 휴무일 배열
      };
      // console.log('0단계', categoryResponse); // 잘 받아와지는지 테스트용
      // 2. 로컬을 바탕으로 상품을 서버에 등록
      if (categoryResponse) {
        // console.log('1단계'); // 잘 받아와지는지 테스트용
        const productResponse = await product.postProduct(
          1,
          parseInt(categoryResponse, 10),
          productInfo,
        );
        if (productResponse.data.status === 201) {
          // console.log('2단계'); // 잘 받아와지는지 테스트용

          // 3. 상품 옵션을 서버에 등록(option페이지에있는거 그대로 사용)
          optionList.map((option) => {
            const optionInfo = {
              optionName: option[1], // 옵션 이름
              optionDesc: '옵션 설명', // 옵션 설명
              optionPrice: parseInt(option[4], 10), // 옵션 가격
              optionImage: URL.createObjectURL(option[0]), // 옵션 이미지 URL
              minUserCount: parseInt(option[2], 10), // 최소 참여 인원
              maxUserCount: parseInt(option[2], 10), // 최대 참여 인원
              userCount: parseInt(option[3], 10), // 티켓 갯수
              timeTable: [
                {
                  startTimeOnly: `${option[5]}시`, // 시작 시간
                  endTimeOnly: `${option[6]}시`, // 종료 시간
                },
              ],
            };
            return productOption.postProductOption(
              productResponse.data.id,
              optionInfo,
            ); // productResponse.id는 방금 등록한 상품의 ID입니다.
          });
          localStorage.removeItem('title');
          localStorage.removeItem('subCategory');
          localStorage.removeItem('content');
          localStorage.removeItem('x');
          localStorage.removeItem('y');
          localStorage.removeItem('addressName');
          localStorage.removeItem('buildingName');
          localStorage.removeItem('startDate');
          localStorage.removeItem('endDate');
          localStorage.removeItem('holiday');
          // alert('상품 및 옵션이 성공적으로 등록되었습니다.');
        }
      }
    } catch (error) {
      // console.error('상품 및 옵션 등록 중 오류가 발생했습니다:', error);
      // alert('상품 및 옵션 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
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
                    className="w-full text-center truncate"
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
                    className="w-full text-center truncate"
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
      <div className="absolute bottom-24 mx-40 w-[calc(100%-364px)]">
        <Button
          buttonType="submit"
          variant="default"
          buttonStyle="text-16 p-16"
          disabled={disabled}
          onClick={onSubmitAll}
        >
          게시하기
        </Button>
      </div>
    </>
  );
};

export default Option;
