/* eslint-disable react/button-has-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import useFetchDetails from '@/hooks/useFetchDetails';
import useModal from '@/hooks/useModal';
import useFetchReview from '@/hooks/useFetchReview';
import location from '@/assets/icons/location.svg';
import KakaoMap from '@/components/common/map/KakaoMap';
import Modal from '@/components/common/Modal';
import Button from '@/components/common/Button';

const ProductDetails = () => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const { product, option } = useFetchDetails(1, 1);

  const { review } = useFetchReview(5);

  return (
    <>
      {/* <img src={product?.productImages[0]} alt="상품이미지" /> */}
      <div className="px-40">
        <h1 className="text-28 font-bold py-32 mobile:py-24 mobile:text-20">
          {product?.name}
        </h1>
        <div className="flex justify-between mobile:flex-col mobile:gap-40">
          <div className="flex flex-col gap-8">
            <h2 className="text-20 font-semibold">체험 설명</h2>
            <p className="text-16">{product?.productDesc}</p>
          </div>
          <div>
            <div className="flex flex-col gap-21 w-285">
              <div className="flex gap-8 text-17 font-semibold">
                <img src={location} alt="위치아이콘" /> 위치
              </div>
              <p className="text-17 mb-12 font-semibold">
                {product?.productAddress}
              </p>
            </div>
            <Button onClick={openModal} text="지도에서 확인하기" />
            <Modal isOpen={isModalOpen} closeModal={closeModal}>
              <KakaoMap
                x={product?.productSiteLat}
                y={product?.productSiteLng}
                name={product?.buildingName || ''}
              />
            </Modal>
          </div>
        </div>
        <div>{option?.userCount}표 남음</div>

        <div>
          <h2>
            리뷰 <span>총 27개</span>
          </h2>
          <div>{review?.score}</div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
