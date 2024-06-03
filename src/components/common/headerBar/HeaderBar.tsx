/* eslint-disable no-undef */
import React, { useState } from 'react';
import logo from '@/assets/icons/travelPortLogo.svg';
import LoginUserHeaderBar from './LoginUserHeaderBar';
import UnLoginUserHeaderBar from './UnLoginUserHeaderBar';
import SearchBar from '../SearchBar';

interface HeaderBarProps {
  userType: 'user' | 'partner'; // 유저 타입: 'user' 혹은 'partner'
}

const cardLists = [
  {
    id: 1,
    title: '스쿠버 다이빙',
    description: '신나는 바닷속 체험',
  },
  {
    id: 2,
    title: '스쿠버플라잉',
    description: '신나는 하늘 체험',
  },
  {
    id: 3,
    title: '나이트 사파리 체험',
    description: '밤에 동물들을 보세요',
  },
  {
    id: 4,
    title: '스킨스쿠버',
    description: '피부로 느끼는 물놀이',
  },
];

const HeaderBar: React.FC<HeaderBarProps> = ({ userType }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  return (
    <div className="fixed top-0 left-0 right-0 py-[3.2rem] text-2xl font-bold bg-white z-50">
      <div className="flex items-center justify-between h-[6rem] px-[4.8rem]">
        <div className="flex items-center">
          <div className="w-[19.5rem] h-[6.5rem] mobile:w-[7.6rem] mobile:h-[2.5rem] tablet:w-[14.7rem] tablet:h-[4.8rem]">
            <img src={logo} alt="Main Logo" />
          </div>
        </div>
        <div className="flex-1 mx-[4.8rem]">
          <SearchBar isMainSearchBar cardLists={cardLists} />
        </div>
        <div className="flex items-center">
          {isLoggedIn ? (
            <LoginUserHeaderBar
              setIsLoggedIn={setIsLoggedIn}
              userType={userType}
            />
          ) : (
            <UnLoginUserHeaderBar />
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
