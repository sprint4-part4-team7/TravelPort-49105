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
    title: '스쿠버 다이빙',
    description: '신나는 바닷속 체험',
  },
  {
    title: '스쿠버플라잉',
    description: '신나는 하늘 체험',
  },
];

const HeaderBar: React.FC<HeaderBarProps> = ({ userType }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearch(e.target.value);

  const filteredTitles = cardLists.filter((filteredTitle) => {
    return filteredTitle.title
      .replace(' ', '')
      .toLowerCase()
      .includes(search.trim().toLowerCase());
  });

  return (
    <div className="px-[3.6rem] fixed top-0 left-0 right-0 py-[4.5rem] text-2xl font-bold bg-white z-50">
      <div className="flex items-center">
        <div className="flex-1">
          <div className="bg-pink-200 w-170 py-[1.5rem] px-[3.2rem]">LOGO</div>
        </div>
        <div className="flex-1 bg-[#F5F5F5]">
          <SearchBar
            titles={filteredTitles}
            search={search}
            onChange={onChange}
          />
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
