import { useEffect, useState } from 'react';
import { useProductImageStore, useThumbnailStore } from '@/utils/Zustand';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import plusImage from '@/assets/icons/plusWhite.svg';
import useModal from '@/hooks/functionHooks/useModal';
import product from '@/apis/product';
import postImages from '@/apis/image';
import instance from '@/utils/Axios';
import BUCKER_NAME from '@/constants/Bucket';
import trashImage from '@/assets/icons/trashRed.svg';
import Button from '@/components/common/button/Button';
import Modal from '@/components/common/modal/Modal';
import OptionModal from './OptionModal';

const Option = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const [optionList, setOptionList] = useState([]);

  const { thumbnail } = useThumbnailStore();
  const { productImages } = useProductImageStore();

  const [disabled, setDisabled] = useState(true);

  const extractId = (str: any) => {
    const regex = /"id":(\d+)/;
    const match = str.match(regex);
    return match ? parseInt(match[1], 10) : null;
  };

  const id = extractId(localStorage.getItem('user-info'));
  const navigation = useNavigate();

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

  const formatDate = (date: any) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const ss = String(date.getSeconds()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  useEffect(() => {
    if (
      name !== null &&
      productType !== null &&
      productDesc !== null &&
      productSiteLat !== null &&
      productSiteLng !== null &&
      productAddress !== null &&
      buildingName !== null &&
      startDate !== null &&
      endDate !== null &&
      holiday !== null &&
      optionList.length > 0
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [optionList]);
  const onSubmitAll = async () => {
    try {
      const categoryResponse = localStorage.getItem('categoryId');
      const handleUploadThumbnail = async () => {
        const thumbnailResponse = await postImages(
          [thumbnail],
          BUCKER_NAME.ADDITIONAL_PRODUCT,
        );
        return thumbnailResponse[0];
      };
      const handleUploadProduct = async () => {
        const productImagesResponse = await postImages(
          productImages,
          BUCKER_NAME.ADDITIONAL_PRODUCT,
        );
        return productImagesResponse;
      };
      const productInfo = {
        name: name !== null ? name : '',
        productType: productType !== null ? productType : '',
        productDesc: productDesc !== null ? productDesc : '',
        productSiteLat:
          productSiteLat !== null ? parseFloat(productSiteLat) : 0,
        productSiteLng:
          productSiteLng !== null ? parseFloat(productSiteLng) : 0,
        productAddress: productAddress !== null ? productAddress : '',
        buildingName: buildingName !== null ? buildingName : '',
        thumbnail: await handleUploadThumbnail(),
        productImages: await handleUploadProduct(),
        startDate: startDate !== null ? formatDate(new Date(startDate)) : '',
        endDate: endDate !== null ? formatDate(new Date(endDate)) : '',
        closedDay: holiday !== undefined ? holiday : [''],
      };
      if (categoryResponse) {
        const productResponse = await product.postProduct(
          id !== null ? id : 1,
          parseInt(categoryResponse, 10),
          productInfo,
        );
        if (productResponse.data.id) {
          const promise = optionList.map(async (option) => {
            const handleUploadOption = async () => {
              const optionResponse = await postImages(
                [option[0]],
                BUCKER_NAME.PRODUCT_OPTION,
              );
              return optionResponse[0];
            };
            const optionInfo = [
              {
                productId: productResponse.data.id,
                optionName: option[1],
                optionDesc: option[7],
                optionPrice: parseInt(option[4], 10),
                optionImages: await handleUploadOption(),
                minUserCount: 1,
                maxUserCount: parseInt(option[2], 10),
                userCount: parseInt(option[3], 10),
                timeTable: [
                  {
                    startTimeOnly: `${option[5] > 9 ? option[5] : `0${option[5]}`}:00`,
                    endTimeOnly: `${option[6] > 9 ? option[6] : `0${option[6]}`}:00`,
                  },
                ],
              },
            ];
            return instance.post('/productOption', optionInfo);
          });
          Promise.all(promise)
            .then(() => {
              toast.success('모든 옵션이 성공적으로 등록되었습니다.');
            })
            .catch(() => {
              toast.error('옵션 등록 중 오류가 발생했습니다.');
            });
          localStorage.removeItem('categoryId');
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
          navigation('/partner');
        }
      }
    } catch (error) {
      toast.error('상품 및 옵션 등록 중 오류가 발생했습니다.');
    }
  };

  return (
    <>
      <div className="flex flex-col mx-40">
        <table className="w-full table-auto">
          <thead>
            <tr className="flex justify-center gap-20 p-12 font-semibold text-17">
              <th className="flex-1">대표이미지</th>
              <th className="flex-1">체험상품명</th>
              <th className="flex-1">가능인원</th>
              <th className="flex-1">티켓갯수</th>
              <th className="flex-1">가격</th>
              {localStorage.getItem('categoryId') === '1' ? (
                ''
              ) : (
                <>
                  <th className="flex-1">시작시간</th>
                  <th className="flex-1">종료시간</th>
                </>
              )}

              <th className="flex-1">상품설명</th>
              <th className="flex-1">삭제</th>
            </tr>
          </thead>
          <tbody>
            {optionList.map((i: any, index: number) => (
              <tr
                key={`${i}option`}
                className="flex items-center justify-center gap-20 p-12 bg-black-2 text-16"
              >
                <td aria-label="img" className="flex justify-center flex-1">
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
                {localStorage.getItem('categoryId') === '1' ? (
                  ''
                ) : (
                  <>
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
                  </>
                )}
                <td aria-label="content" className="flex-1">
                  <input
                    className="w-full text-center truncate"
                    type="text"
                    value={i[7]}
                    readOnly
                  />
                </td>
                <td aria-label="content" className="flex justify-center flex-1">
                  <img
                    src={trashImage}
                    alt="삭제 아이콘"
                    role="presentation"
                    onClick={() => {
                      const temp = [...optionList];
                      temp.splice(index, 1);
                      setOptionList(temp);
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 w-148">
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
