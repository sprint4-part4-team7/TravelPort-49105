import React from 'react';
import { useUserMypageStore } from '@/utils/zustand';
import Button from '../common/Button';

interface MyPageSideBarProps {
  children: React.ReactNode;
}

const MyPageSideBar = ({ children }: MyPageSideBarProps) => {
  const setMypage = useUserMypageStore((state) => state.setUserMypage);

  const handleStorageClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-row gap-24 w-full">
      <div className="flex flex-col w-144 gap-12 p-12">
        <Button text="사용자 정보 수정" onClick={() => setMypage('user')} />
        <Button text="파트너 정보 수정" onClick={() => setMypage('partner')} />
        <Button text="예약 내역" onClick={() => setMypage('reservation')} />
        <Button text="스토리지 정리" onClick={handleStorageClear} />
      </div>
      {children}
    </div>
  );
};

export default MyPageSideBar;
