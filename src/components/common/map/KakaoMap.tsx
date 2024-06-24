import { Map, MapMarker, CustomOverlayMap } from 'react-kakao-maps-sdk';

type MapProps = {
  x?: number;
  y?: number;
  building: string;
};

const KakaoMap = ({ x, y, building }: MapProps) => {
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
