/* eslint-disable no-undef */
import React, { useState } from 'react';
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
    <div className="px-[3.6rem] fixed top-0 left-0 right-0 py-[4.5rem] text-2xl font-bold bg-white z-50">
      <div className="flex items-center">
        <div className="flex gap-[6.5rem]">
          <div className="flex-1">
            <div className="bg-pink-200 w-170 py-[1.5rem] px-[3.2rem]">
              LOGO
            </div>
          </div>
          <div className="flex-2 w-[40.2rem] bg-[#F5F5F5]">
            <SearchBar cardLists={cardLists} />
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex justify-end flex-1 space-x-2">
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
