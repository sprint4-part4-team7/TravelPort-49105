// [파트너] 상품등록페이지 안의 위치등록 페이지

import { useState } from 'react';
import PostCode from '@/components/common/map/PostCode';
import KakaoMap from '@/components/common/map/KakaoMap';
import { PageIdProps } from './productPage';

const Location = ({ setPage, setActiveStep }: PageIdProps) => {
  const [x, setX] = useState(33.5563);
  const [y, setY] = useState(126.79581);
  const [building, setBuilding] = useState('');

  return (
    <div>
      <div>
        <PostCode
          setPage={setPage}
          setActiveStep={setActiveStep}
          setX={setX}
          setY={setY}
          setBuilding={setBuilding}
        />
      </div>
      <div className="mx-40">
        <KakaoMap x={x} y={y} building={building} />
      </div>
    </div>
  );
};

export default Location;
