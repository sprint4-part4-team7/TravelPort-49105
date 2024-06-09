import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import saveImage from '@/assets/icons/check-circle-broken.svg';
import CheckButton from '@/pages/productRegist/CheckButton';
import ImageButton from '@/pages/productRegist/ImageButton';

type PostCodeForm = {
  address: string;
  building: string;
};

type PostCodeProps = {
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  setBuilding: React.Dispatch<React.SetStateAction<string>>;
};

const PostCode = ({ setX, setY, setBuilding }: PostCodeProps) => {
  // 여기서의 set들은 kakao에 있는변수로 상위로 끌어쓰기위한 useState
  const { register, handleSubmit, setValue } = useForm<PostCodeForm>({
    mode: 'onChange',
  });
  const open = useDaumPostcodePopup();

  const [address, setAddress] = useState({ x: 0, y: 0, addressName: '' }); // postcode에서 받아올 x,y,주소를 저장할 변수로 이 페이지내에서만 사용
  const [sideAddress, setSideAddress] = useState(''); // 상세주소 input에 들어갈 값(초기엔 받아온 빌딩이름, 수정시 변경한 텍스트)으로 이 페이지내에서만 사용

  const [disabled, setDisabled] = useState(true); // [버튼] disabled 된게 초기설정
  const [disabledSave, setDisabledSave] = useState(true); // [주소저장버튼] disabled 된게 초기설정

  useEffect(() => {
    if (localStorage.getItem('addressName') !== null) {
      const addressName = localStorage.getItem('addressName');
      const buildingName = localStorage.getItem('buildingName');
      setX(Number(localStorage.getItem('x')));
      setY(Number(localStorage.getItem('y')));
      if (addressName && buildingName) {
        setBuilding(buildingName);
        setValue('address', addressName);
        setValue('building', buildingName);
        setAddress({
          // 상태초기화하면 이전값이 사라지는걸 방지
          x: Number(localStorage.getItem('x')),
          y: Number(localStorage.getItem('y')),
          addressName,
        });
      }
    }
  }, []);

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
          setValue('address', result.data.documents[0].address.address_name); // 지도에서 리턴되는걸 여기에 value로 저장
          // 빌딩 이름이 있다면
          if (result.data.documents[0].road_address.building_name) {
            setSideAddress(result.data.documents[0].road_address.building_name);
            setValue(
              // 지도에서 리턴되는걸 여기에 value로 저장
              'building',
              result.data.documents[0].road_address.building_name,
            );
          }
        }
      }
    });
  };

  const handleClick = () => {
    // 클릭시 검색팝업열림
    open({ onComplete: handleComplete });
  };

  useEffect(() => {
    if (sideAddress.length > 0) {
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
  }, [sideAddress]);
  const changeBuildingName = (event: any) => {
    setSideAddress(event?.target.value);
  };

  // 주소 저장 버튼 누르면
  const onSubmit = () => {
    // kakao에 전달할 인자들
    setX(address.x);
    setY(address.y);
    setBuilding(sideAddress);
    // 로컬스토리지에 보내질 값들
    localStorage.setItem('x', address.x.toString());
    localStorage.setItem('y', address.y.toString());
    localStorage.setItem('addressName', address.addressName);
    localStorage.setItem('buildingName', sideAddress);
    // [버튼] input 클릭시 abled
    setDisabled(false);
  };

  return (
    <form>
      <div className="mx-40 flex flex-col gap-24">
        <label htmlFor="address">
          <p className="text-17">기본 주소 검색</p>
          <input
            className="h-48"
            {...register('address', {
              required: '주소를 다시 검색해주세요.',
            })}
            placeholder="클릭해서 주소를 검색해주세요."
            id="address"
            type="text"
            onClick={handleClick}
            onFocus={changeBuildingName}
            readOnly // 검색으론 쓸수있지만 직접 텍스트입력은 못함
          />
        </label>
        <label htmlFor="sideAddress">
          <p className="text-17">상세 주소 입력</p>
          {/* input엔 빌딩이름이 기본적으로 존재하면 들어가고, 파트너가 바꾸고 싶다면 변경가능하게 구현 */}
          <input
            className="h-48"
            {...register('building', {
              required: '빌딩이름을 다시 적어주세요.',
            })}
            placeholder="빌딩이름을 적어주세요."
            id="sideAddress"
            type="text"
            onChange={changeBuildingName}
          />
        </label>
        <div className="flex justify-end mb-8">
          <ImageButton onClick={handleSubmit(onSubmit)} disabled={disabledSave}>
            <img src={saveImage} alt="저장이미지" />
            주소 정보 저장
          </ImageButton>
        </div>
      </div>
      <CheckButton disabled={disabled} />
    </form>
  );
};

export default PostCode;
