import React from 'react';
import { useUserMypageStore, useUserStore } from '@/utils/zustand';
import { useNavigate } from 'react-router-dom';
import randomProfile from '@/utils/randomProfile';
import Button from '@/components/common/Button';
import MyPageButton from '@/components/myPage/MyPageButton';

interface MyPageSideBarProps {
  children: React.ReactNode;
  isPartner: boolean;
}

const MyPageSideBar = ({ children, isPartner = false }: MyPageSideBarProps) => {
  const navigate = useNavigate();
  const navigateUrl = `${isPartner ? '/partner' : ''}/mypage/`;
  const { userMypage, setUserMypage } = useUserMypageStore();
  const { userInfo } = useUserStore();

  const handleStorageClear = () => {
    localStorage.clear();
    window.location.reload();
  };

  const changeStatus = (newStatus: string) => {
    if (newStatus !== userMypage && !!newStatus) {
      setUserMypage(newStatus);
      navigate(navigateUrl + newStatus, { replace: true });
    }
  };

  const buttonList = [
    { status: 'edit-info', text: '정보 수정' },
    ...(isPartner
      ? [{ status: 'manage', text: '예약 관리' }]
      : [
          { status: 'reservation-status', text: '예약 현황' },
          { status: 'reservation-history', text: '예약 내역' },
        ]),
  ];

  return (
    <div className="flex flex-row mobile:flex-col gap-24 w-full">
      <div className="flex flex-col relative justify-between px-12 border-r-1 mobile:border-r-0 border-black-4">
        <div className="flex flex-col w-241 mobile:w-full gap-32">
          <div className="flex flex-col gap-12 items-center">
            <img
              src={userInfo.profileImage || randomProfile}
              alt="profile"
              className="w-120 h-120 rounded-full"
            />
            <span className="text-14 font-semibold px-4 py-8">
              {userInfo.name}
            </span>
          </div>
          <div className="flex flex-col gap-4 mobile:flex-row mobile:justify-center">
            {buttonList.map((button) => (
              <MyPageButton
                key={button.status}
                setStatus={changeStatus}
                page={button.status}
              >
                {button.text}
              </MyPageButton>
            ))}
          </div>
        </div>
        <Button
          isCancel
          outlined
          buttonStyle="text-16 p-12 mobile:hidden"
          onClick={handleStorageClear}
        >
          로그아웃
        </Button>
      </div>
      {children}
    </div>
  );
};

export default MyPageSideBar;
