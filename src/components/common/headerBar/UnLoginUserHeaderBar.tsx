import React from 'react';
import { useNavigate } from 'react-router-dom';

const UnLoginUserHeaderBar = () => {
  const navigate = useNavigate();
  return (
    <div className="space-x-[1.2rem]">
      <button
        type="button"
        className="box-border border-1 border-[#356EFF] border-solid p-[0.9rem] rounded-4 text-[#356EFF] text-[1.4rem] font-semibold	leading-[142%]"
      >
        파트너 페이지
      </button>
      <button
        type="button"
        className="bg-[#356EFF] text-white p-[1rem] rounded-4 text-[1.4rem] font-semibold	leading-[142%]"
        onClick={() => navigate('./login')}
      >
        로그인 및 회원가입
      </button>
    </div>
  );
};

export default UnLoginUserHeaderBar;
