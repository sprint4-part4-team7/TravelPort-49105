import axios from 'axios';
import React, { useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';

type PostCodeProps = {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
};

const PostCode = ({ setX, setY, setName }: PostCodeProps) => {
  const open = useDaumPostcodePopup();

  const [address, setAddress] = useState({ x: 0, y: 0, addressName: '' }); // postcode에서 받아올 x,y,주소를 저장할 변수
  const [sideAddress, setSideAddress] = useState(''); // 상세주소 input에 들어갈 값(초기엔 받아온 빌딩이름, 수정시 변경한 텍스트)

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
        // x,y가 있다면
        if (result.data.documents[0].x && result.data.documents[0].y) {
          // Kakao Local API로 검색한 주소 정보 및 위도, 경도값 저장
          // kakaomap에서 제공되는 x,y와 daum에서 제공하는 x,y의 개념이 다름(daum에선 x가 경도, y가 위도)
          setAddress({
            x: Number(result.data.documents[0].road_address.y),
            y: Number(result.data.documents[0].road_address.x),
            addressName: result.data.documents[0].address.address_name,
          });
          // 빌딩 이름이 있다면
          if (result.data.documents[0].road_address.building_name) {
            setSideAddress(result.data.documents[0].road_address.building_name);
          }
        }
      }
    });
  };

  const handleClick = () => {
    // 클릭시 검색팝업열림
    open({ onComplete: handleComplete });
  };

  const changeBuildingName = (event: any) => {
    setSideAddress(event?.target.value);
  };

  const onSubmit = () => {
    // 최종적으로 보낼 정보를 저장(추후 서버에 보낼때도 사용)
    setX(address.x);
    setY(address.y);
    setName(sideAddress);
  };
  return (
    <div>
      <label htmlFor="address">
        <p>기본 주소 검색</p>
        <input
          id="address"
          value={address.addressName}
          type="text"
          onClick={handleClick}
          readOnly // 검색으론 쓸수있지만 직접 텍스트입력은 못함
        />
      </label>
      <label htmlFor="sideAddress">
        <p>상세 주소 입력</p>
        {/* input엔 빌딩이름이 기본적으로 존재하면 들어가고, 파트너가 바꾸고 싶다면 변경가능하게 구현 */}
        <input
          id="sideAddress"
          value={sideAddress}
          type="text"
          onChange={changeBuildingName}
        />
      </label>
      <button type="submit" onClick={onSubmit}>
        주소 정보 저장
      </button>
    </div>
  );
};

export default PostCode;
