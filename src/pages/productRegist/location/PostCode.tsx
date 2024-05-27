import axios from 'axios';
import React from 'react';
import DaumPostcodeEmbed from 'react-daum-postcode';

type PostCodeProps = {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const PostCode = ({ setX, setY, setName }: PostCodeProps) => {
  const handleComplete = (data: any) => {
    const fullAddress = data.address;
    const config = {
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_RESTAPI}`,
      },
    }; // 헤더 설정
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=
      ${fullAddress}`; // REST API url에 data.address값 전송

    axios.get(url, config).then(function handleResult(result) {
      // API호출
      if (result.data !== undefined || result.data !== null) {
        if (result.data.documents[0].x && result.data.documents[0].y) {
          // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장
          // kakaomap에서 제공되는 x,y와 daum에서 제공하는 x,y의 개념이 다름(daum에선 x가 경도, y가 위도)
          console.log(result);
          setX(Number(result.data.documents[0].road_address.y));
          setY(Number(result.data.documents[0].road_address.x));
          setName(result.data.documents[0].road_address.building_name);
        }
      }
    });
  };

  return <DaumPostcodeEmbed onComplete={handleComplete} />;
};

export default PostCode;
