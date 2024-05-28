// [파트너] 상품등록페이지 안의 위치등록 페이지

import { useState } from 'react';
import PostCode from './PostCode';
import KakaoMap from '@/components/common/kakaoMap';

const Location = () => {
  const [x, setX] = useState(33.5563);
  const [y, setY] = useState(126.79581);
  const [name, setName] = useState('');

  return (
    <>
      <div>
        <PostCode setX={setX} setY={setY} setName={setName} />
      </div>
      <div>
        <KakaoMap x={x} y={y} name={name} />
      </div>
    </>
  );
};

export default Location;
