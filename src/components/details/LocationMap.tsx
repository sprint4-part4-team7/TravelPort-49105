import location from '@/assets/icons/location.svg';
import arrowRightUp from '@/assets/icons/arrowRightUp.svg';
import useModal from '@/hooks/useModal';
import { DetailData } from '@/constants/types';
import KakaoMap from '@/components/common/map/KakaoMap';
import Modal from '@/components/common/Modal';

interface LocationMapProps {
  product?: DetailData;
}

const LocationMap = ({ product }: LocationMapProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();

  return (
    <>
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
          building={product?.buildingName || ''}
        />
      </Modal>
    </>
  );
};

export default LocationMap;
