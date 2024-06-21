import React from 'react';
import { useUserMypageStore, useUserStore } from '@/utils/zustand';
import { useNavigate } from 'react-router-dom';
import useProfileImage from '@/utils/randomProfile';
import useLogoutMutation from '@/hooks/reactQuery/auth/useLogoutMutation';
import { removeCookie } from '@/utils/cookie';
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
  const { userInfo, setUserInfo } = useUserStore();
  const { mutate: logout } = useLogoutMutation();
  const image = useProfileImage(userInfo);

  const handleLogOut = () => {
    setUserInfo({
      id: 0,
      name: '',
      email: '',
      profileImage: '',
      isPartner: 0,
    });
    removeCookie('accessToken');
    removeCookie('refreshToken');
    navigate('/');
    logout();
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
      ? [
          { status: 'posting-manage', text: '게시물 관리' },
          { status: 'reserve-manage', text: '예약 관리' },
        ]
      : [
          { status: 'reservation-status', text: '예약 현황' },
          { status: 'reservation-history', text: '예약 내역' },
        ]),
  ];

  return (
    <div className="flex flex-row w-full min-h-screen gap-24 mobile:flex-col">
      <div className="relative flex flex-col justify-between px-12 border-r-1 mobile:border-r-0 border-black-4">
        <div className="flex flex-col gap-32 w-241 tablet:w-175 mobile:w-full">
          <div className="flex flex-col items-center gap-12">
            <img
              src={userInfo.profileImage || image}
              alt="profile"
              className="rounded-full w-120 h-120"
            />
            <span className="px-4 py-8 font-semibold text-14">
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
          onClick={handleLogOut}
        >
          로그아웃
        </Button>
      </div>
      {children}
    </div>
  );
};

export default MyPageSideBar;
