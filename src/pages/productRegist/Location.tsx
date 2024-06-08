// [파트너] 상품등록페이지 안의 위치등록 페이지

import { useState } from 'react';
import PostCode from '@/components/common/map/PostCode';
import KakaoMap from '@/components/common/map/KakaoMap';

const Location = () => {
  const [x, setX] = useState(33.5563);
  const [y, setY] = useState(126.79581);
  const [building, setBuilding] = useState('');
  const [location, setLocation] = useState('');
  console.log(x, y, building, location); // 로컬스토리지에 넣기

  return (
    <>
      <div>
        <PostCode
          setX={setX}
          setY={setY}
          setBuilding={setBuilding}
          setLocation={setLocation}
        />
      </div>
      <div>
        <KakaoMap x={x} y={y} building={building} />
      </div>
    </>
  );
};

export default Location;
