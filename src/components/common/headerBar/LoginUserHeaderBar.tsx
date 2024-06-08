import React, { useState, useRef, useEffect } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import cart from '@/assets/icons/shoppingCart.svg';
import myInfo from '@/assets/icons/my-info.svg';
import reservationStatus from '@/assets/icons/reservation-status.svg';
import list from '@/assets/icons/list.svg';
import menu from '@/assets/icons/menu.svg';
import useLogoutMutation from '@/hooks/reactQuery/auth/useLogoutMutation';
import { removeCookie } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from '@/utils/zustand';
import defaul1Img1 from '@/assets/icons/defaultImg1.svg';
import defaul1Img2 from '@/assets/icons/defaultImg2.svg';
import defaul1Img3 from '@/assets/icons/defaultImg3.svg';
import defaul1Img4 from '@/assets/icons/defaultImg4.svg';
import defaul1Img5 from '@/assets/icons/defaultImg5.svg';

interface LoginUserHeaderBarProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  userType: 'user' | 'partner';
}

interface User {
  name: string;
  image: string | undefined;
}

interface MenuItem {
  id: string;
  icon?: any;
  label: string;
  path?: any;
  action?: () => void;
}

const LoginUserHeaderBar: React.FC<LoginUserHeaderBarProps> = ({
  setIsLoggedIn,
  userType,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navagate = useNavigate();
  const { mutate: logout } = useLogoutMutation();
  const { userInfo } = useUserStore();

  const defaultImages = [
    defaul1Img1,
    defaul1Img2,
    defaul1Img3,
    defaul1Img4,
    defaul1Img5,
  ];

  // 랜덤으로 이미지 선택
  const getRandomImage = (images: string[]): string => {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  };

  // userInfo.profileImage가 비어있으면 랜덤 이미지를, 그렇지 않으면 userInfo.profileImage를 사용
  const image = userInfo.profileImage || getRandomImage(defaultImages);

  const user: User = {
    name: userInfo.name,
    image,
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useOutsideClick(dropdownRef, () => {
    setIsDropdownOpen(false);
    setIsSidebarOpen(false);
  });

  const clickLogoutButton = () => {
    setIsLoggedIn(false);
    removeCookie('accessToken');
    removeCookie('refreshToken');
    navagate('/');
    logout();
  };

  // 스크롤바 너비를 계산하는 함수
  const getScrollbarWidth = () => {
    return window.innerWidth - document.documentElement.clientWidth;
  };

  useEffect(() => {
    const scrollbarWidth = getScrollbarWidth();
    if (isSidebarOpen) {
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
  }, [isSidebarOpen]);

  const menuItems: MenuItem[] = [
    { id: 'my-info', icon: myInfo, label: '내 정보', path: '/mypage' },
    ...(userType === 'user'
      ? [
          {
            id: 'reservation-status',
            icon: list,
            label: '예약 내역',
            path: '/mypage',
          },
          {
            id: 'reservation-history',
            icon: reservationStatus,
            label: '예약 현황',
            path: '/mypage',
          },
        ]
      : []),
    { id: 'logout', label: '로그아웃', action: clickLogoutButton },
  ];

  const sideItems: MenuItem[] = [
    { id: 'my-info', icon: myInfo, label: '내 정보', path: '/mypage' },
    ...(userType === 'user'
      ? [
          {
            id: 'reservation-status',
            icon: list,
            label: '예약 내역',
            path: '/mypage',
          },
          {
            id: 'reservation-history',
            icon: reservationStatus,
            label: '예약 현황',
            path: '/mypage',
          },
        ]
      : []),
  ];

  return (
    <div className="relative flex items-center space-x-12">
      <div className="flex items-center space-x-12 mobile:hidden">
        <button
          type="button"
          className="flex items-center"
          onClick={toggleDropdown}
        >
          <img
            src={user.image}
            alt="Profile"
            className="rounded-full cursor-pointer h-[3.2rem] w-[3.2rem]"
          />
        </button>
        <img
          className="h-[3.2rem] w-[3.2rem]"
          src={cart}
          alt="쇼핑 카트 아이콘"
        />
      </div>
      <div className="hidden mobile:flex">
        <button type="button" onClick={toggleSidebar}>
          <img
            src={menu}
            alt="Menu"
            className="h-[3.2rem] w-[3.2rem] cursor-pointer"
          />
        </button>
      </div>
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute mt-10 bg-white border border-gray-300 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.25)] top-full rounded-[1.2rem] pt-[0.8rem] pb-[0.4rem]"
          style={{ marginLeft: '-1.5rem', width: 'auto' }}
        >
          <ul className="w-[106px] text-[1.5rem] font-normal">
            {/* 프로필 이미지랑 이름 */}
            <li className="items-center hidden p-2 mobile:flex px-[1.2rem] justify-between py-1.5 hover:bg-blue-50">
              <div className="flex items-center gap-[0.8rem]">
                <img
                  src={user.image}
                  alt="Profile"
                  className="rounded-full h-[3.2rem] w-[3.2rem] mobile:w-[2.6rem] mobile:h-[2.6rem]"
                />
                <span className="ml-2">{user.name}</span>
              </div>
            </li>
            {/* 장바구니 아이콘 */}
            <li className="items-center justify-between hidden px-[1.2rem] mobile:flex py-1.5 hover:bg-blue-50">
              <div className="flex items-center">
                <img
                  className="h-[3.2rem] w-[3.2rem] mobile:w-[1.6rem] mobile:h-[1.6rem]"
                  src={cart}
                  alt="쇼핑 카트 아이콘"
                />
                <span className="ml-[0.8rem]">장바구니</span>
              </div>
            </li>
            {/* 드롭다운 */}
            {menuItems.map((item, index) => (
              <li
                key={item.id}
                className={`px-[0.6rem] flex justify-center items-center p-2 ${index === menuItems.length - 1 ? 'border-t border-solid border-gray-200' : ''} ${item.label === '로그아웃' ? 'hover:text-[#000] text-gray-400 font-semibold' : 'hover:bg-blue-50 '}`}
              >
                <button
                  type="button"
                  className={`flex items-center w-full py-1.5 cursor-pointer ${item.label === '로그아웃' && 'justify-center'}`}
                  onClick={() => {
                    if (item.action) {
                      item.action();
                    } else {
                      window.location.href = item.path;
                    }
                  }}
                  style={{ gap: item.label === '로그아웃' ? '0' : '0.8rem' }}
                >
                  {item.icon && item.label !== '로그아웃' && (
                    <img src={item.icon} alt="아이콘" className="mr-1" />
                  )}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* 사이드바 및 배경 오버레이 */}
      <div
        className={`fixed inset-0 z-40 flex transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* 배경 오버레이 */}
        <div
          className="absolute inset-0 bg-opacity-50 bg-black-7 left-[-2rem]"
          onClick={() => setIsSidebarOpen(false)}
        />
        {/* 사이드바 */}
        <div
          className={`fixed top-0 right-0 h-full w-280 bg-white z-50 transition-transform transform ease-in-out duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          <div className="p-4" ref={dropdownRef}>
            <div className="flex flex-col gap-16 px-24 border-solid py-28 border-b-1 border-black-3">
              <div className="flex items-center gap-13 ">
                <img
                  className="w-32 y-32"
                  src={user.image}
                  alt="프로필 이미지"
                />
                <div className="font-normal text-15 ">{user.name}</div>
              </div>
              <div>
                <button
                  className="px-12 py-6 font-normal border-solid text-11 border-1 border-black-12 rounded-24"
                  type="button"
                >
                  로그아웃
                </button>
              </div>
            </div>
            <div className="p-24">
              <ul>
                {sideItems.map((item) => (
                  <li key={item.id} className="py-2">
                    <button
                      type="button"
                      className="flex items-center w-full px-12 py-8 cursor-pointer hover:bg-blue-50"
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        } else {
                          window.location.href = item.path;
                        }
                      }}
                    >
                      <div className="flex gap-8 font-normal text-15">
                        {item.icon && (
                          <img src={item.icon} alt="아이콘" className="mr-2" />
                        )}
                        {item.label}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginUserHeaderBar;
