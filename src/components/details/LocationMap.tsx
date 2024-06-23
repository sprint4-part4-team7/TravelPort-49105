import location from '@/assets/icons/location.svg';
import arrowRightUp from '@/assets/icons/arrowRightUp.svg';
import useModal from '@/hooks/useModal';
import { DetailData } from '@/constants/Types';
import KakaoMap from '@/components/common/map/KakaoMap';
import Modal from '@/components/common/modal/Modal';

interface LocationMapProps {
  product?: DetailData;
}

const LocationMap = ({ product }: LocationMapProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
      <img src={location} alt="위치아이콘" />
      <span className="font-normal text-15 text-black-6">
        {product?.productAddress}
      </span>
      <span
        onClick={openModal}
        className="font-medium cursor-pointer font-13 ml-13"
      >
        지도뷰로 확인하기{' '}
        <img src={arrowRightUp} alt="대각선화살표" className="inline" />
      </span>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <div className="w-600">
          <KakaoMap
            x={product?.productSiteLat}
            y={product?.productSiteLng}
            building={product?.buildingName || ''}
          />
        </div>
      </Modal>
    </>
  );
};

export default LocationMap;
