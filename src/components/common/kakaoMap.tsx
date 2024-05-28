import { Map, MapMarker } from 'react-kakao-maps-sdk';

type MapProps = {
  x?: number;
  y?: number;
  name: string;
};

const KakaoMap = ({ x, y, name }: MapProps) => {
  // x는 위도(지도상 위아래 적도-0 극지방-90)
  // y는 경도(영국기준 한국은 동경)
  console.log(x);
  console.log(y);
  console.log(name);
  return (
    <Map
      center={{ lat: x ?? 0, lng: y ?? 0 }}
      style={{ width: '800px', height: '600px' }}
      level={4}
    >
      <MapMarker position={{ lat: x ?? 0, lng: y ?? 0 }}>{name}</MapMarker>
    </Map>
  );
};

export default KakaoMap;
