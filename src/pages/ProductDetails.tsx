/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import useFetchDetails from '@/hooks/useFetchDetails';
import useModal from '@/hooks/useModal';
import location from '@/assets/icons/location.svg';
import calendar from '@/assets/icons/calendar.svg';
import arrowRightUp from '@/assets/icons/arrowRightUp.svg';
import getDate from '@/utils/getDate';
import getMinPrice from '@/utils/getMinPrice';
import KakaoMap from '@/components/common/map/KakaoMap';
import Modal from '@/components/common/Modal';

const ProductDetails = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { product, options } = useFetchDetails(3, 1);

  return (
    <div className="mt-100 mb-40 mobile:mt-40 mobile:mx-20 tablet:mx-20">
      <img
        src={product?.productImages[0]}
        alt="상품이미지"
        className="mx-auto w-784"
      />
      <div className="flex flex-col gap-12 mt-32 mb-40 w-784 mx-auto">
        <h1 className="text-20 font-bold">{product?.name}</h1>
        <h2 className="text-20 font-bold mt-4">
          {getMinPrice(options).toLocaleString()}원~
        </h2>
        <p className="text-16 mb-8">{product?.productDesc}</p>

        <div className="flex gap-8 text-17 font-semibold">
          <img src={calendar} alt="달력 아이콘" width={23} />
          <span className="text-15 font-normal text-black-6">
            {product && getDate(product.startDate)}~
            {product && getDate(product.endDate)}
          </span>
        </div>

        <div className="flex gap-8 text-17 font-semibold">
          <img src={location} alt="위치아이콘" />
          <span className="text-15 font-normal text-black-6">
            {product?.productAddress}
          </span>
          <span
            onClick={openModal}
            className="font-13 font-medium ml-13 cursor-pointer"
          >
            지도뷰로 확인하기{' '}
            <img src={arrowRightUp} alt="대각선화살표" className="inline" />
          </span>
          <Modal isOpen={isModalOpen} closeModal={closeModal}>
            <KakaoMap
              x={product?.productSiteLat}
              y={product?.productSiteLng}
              name={product?.buildingName || ''}
            />
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
