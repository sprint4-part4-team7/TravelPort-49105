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
          <img className="h-[3.2rem] w-[3.2rem]" src={menu} alt="Menu" />
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div className="absolute right-[-5rem] z-50 flex-col items-start justify-start hidden p-4 bg-white w-[15rem] top-full mobile:flex rounded-5">
          <button
            type="button"
            className="box-border border-1 border-[#356EFF] border-solid p-[0.75rem] rounded-4 text-[#356EFF] text-[1.4rem] font-semibold leading-[142%] mb-4 w-full text-left"
            onClick={() => {
              navigate('./partner');
              setIsMenuOpen(false);
            }}
          >
            파트너 페이지
          </button>
          <button
            type="button"
            className="bg-[#356EFF] text-white p-[0.85rem] rounded-4 text-[1.4rem] font-semibold leading-[142%] w-full text-left"
            onClick={() => {
              navigate('./login');
              setIsMenuOpen(false);
            }}
          >
            로그인 및 회원가입
          </button>
        </div>
      )}

      {/* 태블릿 및 PC 환경에서 회원가입 / 로그인 버튼들 표시 */}
      <div className=" mobile:hidden space-x-[1.2rem]">
        <button
          type="button"
          className="box-border border-1 border-[#356EFF] border-solid p-[0.75rem] rounded-4 text-[#356EFF] text-[1.4rem] font-semibold leading-[142%]"
        >
          파트너 페이지
        </button>
        <button
          type="button"
          className="bg-[#356EFF] text-white p-[0.85rem] rounded-4 text-[1.4rem] font-semibold leading-[142%]"
          onClick={() => navigate('./login')}
        >
          로그인 및 회원가입
        </button>
      </div>
    </div>
  );
};

export default UnLoginUserHeaderBar;
