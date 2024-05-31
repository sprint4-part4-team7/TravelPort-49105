import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menu from '@/assets/icons/menu.svg';

const UnLoginUserHeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* 모바일 환경에서만 햄버거 아이콘 표시 */}
      <div className="hidden mobile:flex">
        <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img src={menu} alt="Menu" />
        </button>
      </div>

      {/* 태블릿 및 PC 환경에서 버튼들 표시 */}
      <div className=" mobile:hidden space-x-[1.2rem]">
        <button
          type="button"
          className="box-border border-1 border-[#356EFF] border-solid mobile:p-[0.75rem] p-[0.9rem] rounded-4 text-[#356EFF] text-[1.4rem] font-semibold leading-[142%]"
        >
          파트너 페이지
        </button>
        <button
          type="button"
          className="bg-[#356EFF] text-white mobile:p-[0.85rem] p-[1rem] rounded-4 text-[1.4rem] font-semibold leading-[142%]"
          onClick={() => navigate('./login')}
        >
          로그인 및 회원가입
        </button>
      </div>

      {/* 모바일 환경에서 햄버거 아이콘 */}
      {isMenuOpen && (
        <div className="absolute top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-white mobile:hidden">
          <button
            type="button"
            className="box-border border-1 border-[#356EFF] border-solid p-[0.75rem] rounded-4 text-[#356EFF] text-[1.4rem] font-semibold leading-[142%] mb-4"
            onClick={() => setIsMenuOpen(false)}
          >
            파트너 페이지
          </button>
          <button
            type="button"
            className="bg-[#356EFF] text-white p-[0.85rem] rounded-4 text-[1.4rem] font-semibold leading-[142%]"
            onClick={() => {
              navigate('./login');
              setIsMenuOpen(false);
            }}
          >
            로그인 및 회원가입
          </button>
        </div>
      )}
    </div>
  );
};

export default UnLoginUserHeaderBar;
