import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

type MapProps = {
  x?: number;
  y?: number;
  building: string;
};

const KakaoMap = ({ x, y, building }: MapProps) => {
  // x는 위도(지도상 위아래 적도-0 극지방-90)
  // y는 경도(영국기준 한국은 동경)
  // building은 빌딩이름(있을수도, 없을수도)
  return (
    <Map
      center={{ lat: x ?? 0, lng: y ?? 0 }}
      style={{ width: '100%', height: '314px' }}
      level={4}
    >
      <MapMarker position={{ lat: x ?? 0, lng: y ?? 0 }} />
      <CustomOverlayMap position={{ lat: x ?? 0, lng: y ?? 0 }}>
        {building ? (
          <div
            style={{
              margin: 'auto',
              fontSize: '15px',
              fontFamily: 'plex_sansKR',
              fontWeight: 'bold',
              transform: 'translateY(-50px)',
            }}
          >
            {building}
          </div>
        ) : null}
      </CustomOverlayMap>
    </Map>
  );
};

export default KakaoMap;
