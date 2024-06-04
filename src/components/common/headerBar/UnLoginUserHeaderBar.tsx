import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import menu from '@/assets/icons/menu.svg';
import Button from '@/components/common/Button';

const UnLoginUserHeaderBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* 모바일 환경에서만 햄버거 아이콘 표시 */}
      <div className="hidden mobile:flex">
        <button type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <img className="h-32 w-32" src={menu} alt="Menu" />
        </button>
      </div>

      {/* 드롭다운 메뉴 */}
      {isMenuOpen && (
        <div className="absolute -right-50 z-50 flex-col gap-5 items-start justify-start hidden p-4 bg-white w-150 top-full mobile:flex rounded">
          <Button
            outlined
            buttonStyle="text-14 p-8 font-semibold"
            text="파트너 페이지"
            onClick={() => {
              navigate('./partner');
              setIsMenuOpen(false);
            }}
          />
          <Button
            buttonStyle="text-14 p-8 font-semibold"
            text="로그인 및 회원가입"
            onClick={() => {
              navigate('./login');
              setIsMenuOpen(false);
            }}
          />
        </div>
      )}

      {/* 태블릿 및 PC 환경에서 회원가입 / 로그인 버튼들 표시 */}
      <div className="flex mobile:hidden space-x-12">
        <Button
          outlined
          buttonStyle="min-w-fit text-14 p-10 font-semibold"
          text="파트너 페이지"
          onClick={() => {
            navigate('./partner');
          }}
        />
        <Button
          buttonStyle="min-w-fit text-14 p-10 font-semibold"
          text="로그인 및 회원가입"
          onClick={() => {
            navigate('./login');
          }}
        />
      </div>
    </div>
  );
};

export default UnLoginUserHeaderBar;
