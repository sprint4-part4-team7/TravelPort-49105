import React from 'react';
import noPage from '@/assets/icons/no-page.svg';
import { useNavigate } from 'react-router-dom';
import Button from '@/components/common/Button';

const NoPage = () => {
  const navigate = useNavigate();
  const handeleGoToMain = () => {
    navigate('/');
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-40">
      <div>
        <img src={noPage} alt="404" />
      </div>
      <div className="flex flex-col items-center gap-24">
        <p className="font-bold text-28 ">잘못된 접근입니다</p>
        <Button
          onClick={handeleGoToMain}
          buttonStyle="w-335 p-12 text-16 font-normal	"
        >
          메인페이지로 가기
        </Button>
      </div>
    </div>
  );
};

export default NoPage;
