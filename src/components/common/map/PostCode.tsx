import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { useForm } from 'react-hook-form';
import saveImage from '@/assets/icons/check-circle-broken.svg';
import searchImage from '@/assets/icons/search-pr.svg';
import CheckButton from '@/pages/productRegister/CheckButton';
import Button from '@/components/common/button/Button';
import DateCheck from '@/pages/productRegister/DateCheck';

type PostCodeForm = {
  address: string;
  building: string;
};

type PostCodeProps = {
  setPage: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  setX: React.Dispatch<React.SetStateAction<number>>;
  setY: React.Dispatch<React.SetStateAction<number>>;
  setBuilding: React.Dispatch<React.SetStateAction<string>>;
};

const PostCode = ({
  setPage,
  setActiveStep,
  setX,
  setY,
  setBuilding,
}: PostCodeProps) => {
  const { register, handleSubmit, setValue } = useForm<PostCodeForm>({
    mode: 'onChange',
  });
  const open = useDaumPostcodePopup();

  const [address, setAddress] = useState({ x: 0, y: 0, addressName: '' });
  const [sideAddress, setSideAddress] = useState('');

  const [disabled, setDisabled] = useState(true);
  const [disabledSave, setDisabledSave] = useState(true);

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
    };
    const url = `https://dapi.kakao.com/v2/local/search/address.json?query=
      ${fullAddress}`;

    axios.get(url, config).then(function handleResult(result) {
      if (result.data !== undefined || result.data !== null) {
        if (result.data.documents[0].x && result.data.documents[0].y) {
          setAddress({
            x: Number(result.data.documents[0].road_address.y),
            y: Number(result.data.documents[0].road_address.x),
            addressName: result.data.documents[0].address.address_name,
          });
          setValue('address', result.data.documents[0].address.address_name);
          if (result.data.documents[0].road_address.building_name) {
            setSideAddress(result.data.documents[0].road_address.building_name);
            setValue(
              'building',
              result.data.documents[0].road_address.building_name,
            );
          }
        }
      }
    });
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  useEffect(() => {
    if (sideAddress.length > 0 && address.addressName.length > 0) {
      setDisabledSave(false);
    } else {
      setDisabledSave(true);
    }
  }, [sideAddress]);
  const changeBuildingName = (event: any) => {
    setSideAddress(event?.target.value);
  };

  const onSubmit = () => {
    setX(address.x);
    setY(address.y);
    setBuilding(sideAddress);
    localStorage.setItem('x', address.x.toString());
    localStorage.setItem('y', address.y.toString());
    localStorage.setItem('addressName', address.addressName);
    localStorage.setItem('buildingName', sideAddress);
    setDisabled(false);
  };

  return (
    <form>
      <div className="mx-40 flex flex-col gap-24">
        <label className="flex gap-12 flex-col" htmlFor="address">
          <p className="font-semibold text-17">기본 주소 검색</p>
          <div className="flex justify-between h-48 p-12 rounded border-solid border-1 border-black-5 w-full has-[:focus]:border-blue-6 focus:border-1 mobile:max-w-none">
            <input
              className="outline-none text-16 w-full"
              {...register('address', {
                required: '주소를 다시 검색해주세요.',
              })}
              placeholder="클릭해서 주소를 검색해주세요."
              id="address"
              type="text"
              onClick={handleClick}
              onFocus={changeBuildingName}
              readOnly
            />
            <img src={searchImage} alt="검색아이콘" />
          </div>
        </label>
        <label className="flex gap-12 flex-col" htmlFor="sideAddress">
          <p className="font-semibold text-17">상세 주소 입력</p>
          <input
            className="h-48 p-12 rounded text-16 outline-none border-solid border-1 border-black-5 w-full focus:border-blue-6 focus:border-1 mobile:max-w-none"
            {...register('building', {
              required: '상세주소(건물명)을 다시 적어주세요.(50자)',
            })}
            placeholder="상세주소(건물명)을 적어주세요.(50자)"
            id="sideAddress"
            type="text"
            onChange={changeBuildingName}
            maxLength={50}
          />
        </label>
        <div className="flex justify-end mb-8">
          <div className="w-148">
            <Button
              buttonType="submit"
              buttonStyle="text-16 p-12 flex gap-6 justify-center items-center"
              onClick={handleSubmit(onSubmit)}
              disabled={disabledSave}
            >
              <img src={saveImage} alt="저장이미지" />
              주소 정보 저장
            </Button>
          </div>
        </div>
      </div>
      <CheckButton
        disabled={disabled}
        onClick={() => {
          setActiveStep(4);
          setPage(
            <DateCheck setPage={setPage} setActiveStep={setActiveStep} />,
          );
        }}
      />
    </form>
  );
};

export default PostCode;
