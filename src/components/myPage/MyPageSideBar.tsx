import React from 'react';
import { useUserMypageStore, useUserStore } from '@/utils/zustand';
import Button from '@/components/common/Button';
import MyPageButton from '@/components/myPage/MyPageButton';

interface MyPageSideBarProps {
  children: React.ReactNode;
}

const MyPageSideBar = ({ children }: MyPageSideBarProps) => {
  const setMypage = useUserMypageStore((state) => state.setUserMypage);
  const { userInfo } = useUserStore();
  const handleStorageClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="flex flex-row gap-24 w-full">
      <div className="flex flex-col relative justify-between px-12 border-r-1 border-black-4">
        <div className="flex flex-col w-241 gap-32">
          <div className="flex flex-col gap-12 items-center">
            {userInfo?.profileImage?.length ? (
              <img
                src={userInfo.profileImage}
                alt="profile"
                className="w-120 h-120 rounded-full"
              />
            ) : (
              <div className="w-120 h-120 rounded-full relative bg-black-6">
                <div className="absolute text-64 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {userInfo.name[0]}
                </div>
              </div>
            )}
            <span className="text-14 font-semibold px-4 py-8">
              {userInfo.name || '사용자 이름'}
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <MyPageButton setMyPage={setMypage} page="user">
              정보 수정
            </MyPageButton>
            <MyPageButton setMyPage={setMypage} page="partner">
              파트너 정보 수정
            </MyPageButton>
            <MyPageButton setMyPage={setMypage} page="reservation">
              예약 내역
            </MyPageButton>
          </div>
        </div>
        <Button
          text="로그아웃"
          isCancel
          outlined
          onClick={handleStorageClear}
        />
      </div>
      {children}
    </div>
  );
};

export default MyPageSideBar;
