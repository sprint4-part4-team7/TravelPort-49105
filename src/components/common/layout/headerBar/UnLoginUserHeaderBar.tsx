import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menu from '@/assets/icons/menu.svg';
import useOutsideClick from '@/hooks/useOutsideClick';
import Button from '@/components/common/button/Button';

const UnLoginUserHeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
  useOutsideClick(dropdownRef, () => setIsMenuOpen(false));

  // 스크롤바 너비를 계산하는 함수
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      // 메인 컨텐츠에 패딩 추가 (여기서는 body에 직접 적용)
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isMenuOpen]);

  return (
    <div className="relative">
      {/* 모바일 환경에서만 햄버거 아이콘 표시 */}
      <div className="hidden mobile:flex">
        <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img className="w-32 h-32" src={menu} alt="Menu" />
        </button>
      </div>

      {/* 사이드바 및 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* 배경 오버레이 */}
        <div
          className="absolute inset-0 bg-opacity-50 bg-black-7"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* 사이드바 */}
        <div
          className={`fixed top-0 right-0 h-full w-280 bg-white z-50 transition-transform transform ease-in-out duration-300 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col gap-10 px-24 py-28" ref={dropdownRef}>
            <Button
              outlined
              buttonStyle="text-14 p-8 font-semibold"
              onClick={() => {
                navigate('/signup/partner');
                setIsMenuOpen(false);
              }}
            >
              파트너 페이지
            </Button>
            <Button
              buttonStyle="text-14 p-8 font-semibold"
              onClick={() => {
                navigate('/login');
                setIsMenuOpen(false);
              }}
            >
              로그인 및 회원가입
            </Button>
          </div>
        </div>
      </div>

      {/* 태블릿 및 PC 환경에서 회원가입 / 로그인 버튼들 표시 */}
      <div className="flex space-x-12 mobile:hidden">
        <Button
          outlined
          buttonStyle="min-w-fit text-14 p-10 font-semibold"
          onClick={() => {
            navigate('/signup/partner');
          }}
        >
          파트너 페이지
        </Button>
        <Button
          buttonStyle="min-w-fit text-14 p-10 font-semibold"
          onClick={() => {
            navigate('/login');
          }}
        >
          로그인 및 회원가입
        </Button>
      </div>
    </div>
  );
};

export default UnLoginUserHeaderBar;
